import { Request, Response, NextFunction } from "express";

import bcrypt from "bcryptjs";

import jwt from "jsonwebtoken";

import {
    
     validationRegister,
     validationLogin,
     validateTopic,
     validateemptytopic,
     verifyid,

    } from "./validatorsdatabase";

import { createPool } from "./database";

export const loginGET = (req: Request, res: Response): void => {

    res.render('login')

};

export const loginPOST = async (req: Request, res: Response): Promise <void> => {

    const username: string = req.body.username;

    const password: string = req.body.password;

    validationLogin(username, password);

    try {

        const [rows]: any = await createPool.query('SELECT * FROM users WHERE username = ?', [username, password]);

        const user = rows[0];

        if (user && await bcrypt.compare(password, user.password)) {

        jwt.sign({ id: user.id }, 'secret', { expiresIn: '1h' });
        
        res.render('home', {username, password});

        };

        res.render('error');

    } catch (e) {

        console.error("Something happened: ", e);
        throw new Error("Something went wrong. Try again.");

    };

};

export const registerGET = (req: Request, res: Response): void => {

    res.render('register');

};

export const registerPOST = async (req: Request, res: Response): Promise <void> => {

    const username: string = req.body.username;

    const email: string = req.body.email;

    const password: string = req.body.password;

    validationRegister(username, email, password);

    try {

        const passwordHash = await bcrypt.hash(password, 10);

        await createPool.query('INSERT INTO users (username, email, password) VALUES (?, ?, ?)', [username, email, passwordHash]);

       res.render('receiveuser', {username});

    } catch (e) {

        console.error("Something happened: ", e);
        throw new Error("Something went wrong. Try again.");

    };

};

export const profile = async (req: Request, res: Response): Promise <void> => {

    try {

        const [rows]: any = await createPool.query('SELECT * FROM users');

        const user = rows[0];

        res.render('profile', { user });

    } catch (e) {

        console.error("Something happened: ", e);
        res.status(500).send("Something went wrong. Try again.");

    };

};


export const home = (req: Request, res: Response): void => {

    res.render('home');

};

export const createtopicGET = (req: Request, res: Response): void => {

    res.render('createtopic');

};

export const createtopicPOST = async (req: Request, res: Response): Promise <void> => {

    const title: string = req.body.title;

    const theme: string = req.body.theme;

    const text: string = req.body.text;

    validateemptytopic(title, theme, text);

    validateTopic(title, theme, text);

    try {

        await createPool.query('INSERT INTO topics (title, theme, text) VALUES (?, ?, ?)', [title, theme, text]);

        res.render('receivetopics', {title});

    } catch (e) {

        console.error("Something happened: ", e);
        throw new Error("Something went wrong. Try again.");

    };

};

export const viewtopics = async (req: Request, res: Response): Promise <void> => {

    try {

        const [topics] = await createPool.query('SELECT * FROM topics');
        res.render('viewtopics', {topics});

    } catch (e) {

        console.error("Something happened: ", e);
        throw new Error("Something went wrong. Try again.");

    };

};

export const deletetopic = async (req: Request, res: Response): Promise <void> => {

    const id = req.params.id; // mano PQ isso eh uma string????!!!!

    verifyid(id);

    try {

        await createPool.query('DELETE FROM topics WHERE id = ?', [id]);
        res.redirect('/viewtopics');

    } catch (e) {

        console.error("Something happened: ", e);
        throw new Error("Something went wrong. Try again.");

    };

};

export const createcommentsGET = (req: Request, res: Response): void => {

    res.render('comments');

};

export const createcommentsPOST = async (req: Request, res: Response): Promise<void> => {

    const comment: string = req.body.comment;

    try {

        await createPool.query('INSERT INTO comment (comments) VALUES (?)', [comment]);

        res.render('successcomments');

    } catch (e) {

        console.error("Something happened: ", e);
        throw new Error("Something went wrong. Try again.");

    };

};

export const viewcomments = async (req: Request, res: Response): Promise <void> => {

    try {

        const [rows]: any = await createPool.query('SELECT * FROM comment JOIN topics WHERE comment.id = topics.id');
        res.render('viewcomments', {rows});

    } catch (e) {

        console.error("Something happened: ", e);
        throw new Error("Something went wrong. Try again.");

    };

};

export const error = (req: Request, res: Response, next: NextFunction): void => {

    res.sendStatus(404);
    
    next();

};

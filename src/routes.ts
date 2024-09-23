import { Request, Response, NextFunction } from "express";

import bcrypt from "bcryptjs";

import jwt from "jsonwebtoken";

import {
    
     validationRegister,
     validationLogin,
     validateTopic,
     validateemptytopic,
     validateFloatID,

    } from "./validatorsdatabase";

import { createPool } from "./database";

export const loginGET = (request: Request, response: Response): void => {

    response.render('login');

};

export const loginPOST = async (request: Request, response: Response): Promise <void> => {

    const username: string = request.body.username;

    const password: string = request.body.password;

    validationLogin(username, password);

    try {

        const [rows]: any = await createPool.query('SELECT * FROM users WHERE username = ?', [username, password]);

        const user = rows[0];

        if (user && await bcrypt.compare(password, user.password)) {

        jwt.sign({ id: user.id }, 'secret', { expiresIn: '1h' });
        
        response.render('home', { username, password });

        };

        response.render('error');

    } catch (e) {

        console.error("Something happened: ", e);

        throw new Error("Something went wrong. Try again.");

    };

};

export const registerGET = (request: Request, response: Response): void => {

    response.render('register');

};

export const registerPOST = async (request: Request, response: Response): Promise <void> => {

    const username: string = request.body.username;

    const email: string = request.body.email;

    const password: string = request.body.password;

    validationRegister(username, email, password);

    try {

        const passwordHash = await bcrypt.hash(password, 10);

        await createPool.query('INSERT INTO users (username, email, password) VALUES (?, ?, ?)', [username, email, passwordHash]);

       response.render('receiveuser', { username });

    } catch (e) {

        console.error("Something happened: ", e);

        throw new Error("Something went wrong. Try again.");

    };

};

export const profile = async (request: Request, response: Response): Promise <void> => {

    try {

        const [rows]: any = await createPool.query('SELECT * FROM users');

        const user: any = rows[0];

        response.render('profile', { user });

    } catch (e) {

        console.error("Something happened: ", e);

        response.status(500).send("Something went wrong. Try again.");

    };

};


export const home = (request: Request, response: Response): void => {

    response.render('home');

};

export const createtopicGET = (request: Request, response: Response): void => {

    response.render('createtopic');

};

export const createtopicPOST = async (request: Request, response: Response): Promise <void> => {

    const title: string = request.body.title;

    const theme: string = request.body.theme;

    const text: string = request.body.text;

    validateemptytopic(title, theme, text);

    validateTopic(title, theme, text);

    try {

        await createPool.query('INSERT INTO topics (title, theme, text) VALUES (?, ?, ?)', [title, theme, text]);

        response.render('receivetopics', { title });

    } catch (e) {

        console.error("Something happened: ", e);

        throw new Error("Something went wrong. Try again.");

    };

};

export const viewtopics = async (request: Request, response: Response): Promise <void> => {

    try {

        const [topics] = await createPool.query('SELECT * FROM topics');

        response.render('viewtopics', { topics });

    } catch (e) {

        console.error("Something happened: ", e);

        throw new Error("Something went wrong. Try again.");

    };

};

export const deletetopic = async (request: Request, response: Response): Promise <void> => {

    const id = request.params.id; // mano PQ isso eh uma string????!!!!

  //  verifyid(id);

    try {

        await createPool.query('DELETE FROM topics WHERE id = ?', [id]);

        response.redirect('/viewtopics');

    } catch (e) {

        console.error("Something happened: ", e);

        throw new Error("Something went wrong. Try again.");

    };

};

export const createcommentsGET = (request: Request, response: Response): void => {

    const topicid = request.params.topicid;

    response.render('comments', { topicid });

};

export const createcommentsPOST = async (request: Request, response: Response): Promise <void> => {

    const topicidparams = request.params.topicid;

    const comment: string = request.body.comment;

    const topicid: number = parseInt(topicidparams);

    try {

        validateFloatID(topicid);

        await createPool.query('INSERT INTO comment (comments, topic_id) VALUES (?, ?)', [comment, topicid]);

        response.render('successcomments', { comment, topicid });

    } catch (e) {

        console.error("Something happened: ", e);

        throw new Error("Something went wrong. Try again.");

    };

};

export const viewcomments = async (request: Request, response: Response): Promise <void> => {

    const topicidparams = request.params.topicid;

    const topicid: number = parseInt(topicidparams);
    
    try {

        validateFloatID(topicid);

       const [rows]: any = await createPool.query('SELECT * FROM comment JOIN topics ON comment.topic_id = topics.id WHERE topics.id = ?', [topicid]);

        response.render('viewcomments', { rows });

    } catch (e) {

        console.error("Something happened: ", e);

        throw new Error("Something went wrong. Try again.");

    };

};

export const deletecomment = async (request: Request, response: Response): Promise <void> => {;

    try {

       const [gatherid] = await createPool.query('SELECT * FROM comment');

       response.render('delete', { gatherid });

    } catch (e) {

        console.error("Something happened: ", e);

        throw new Error("Something went wrong. Try again.");

    };

};

export const deletecommentPOST = async (request: Request, response: Response): Promise <void> => {

    const commentid = request.body.id;
    
    try {

        await createPool.query('DELETE FROM comment WHERE id = ?', [commentid]);

        response.redirect('/home');

    } catch (e) {

        console.error("Something happened: ", e);
        
        throw new Error("Something went wrong. Try again.");

    };

};  

export const error = (request: Request, response: Response, next: NextFunction): void => {

    response.sendStatus(404);
    
    next();

};

import { Request, Response, NextFunction } from "express";

import validator from "validator";

import bcrypt from "bcryptjs";

import { validation } from "./validatorsroutes";

import { createPool } from "./database";

export const loginGET = (req: Request, res: Response): void => {

    res.render('login')

};

export const loginPOST = async (req: Request, res: Response): Promise <void> => {

    const username = req.body.username;

    const password = req.body.password;

    res.send(`Username: ${username}, Password: ${password}`);

};

export const registerGET = (req: Request, res: Response): void => {

    res.render('register');

};

export const registerPOST = async (req: Request, res: Response): Promise <void> => {

    const username: string = req.body.username;

    const email: string = req.body.email;

    const password: string = req.body.password;

    validation(username, email, password);

    try {

        const passwordHash = await bcrypt.hash(password, 10);

        await createPool.query('INSERT INTO users (username, email, password) VALUES (?, ?, ?)', [username, email, passwordHash]);

       res.render('receiveuser', {username});

    } catch (e) {

        console.error("Something happened: ", e);
        throw new Error("Something went wrong. Try again.");

    };

};

export const home = (req: Request, res: Response): void => {

    res.render('home');

};

export const error = (req: Request, res: Response, next: NextFunction): void => {

    res.sendStatus(404);
    
    next();

};

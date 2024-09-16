import { Request, Response, NextFunction } from "express";

import bcrypt from "bcryptjs";

import jwt from "jsonwebtoken";

import { validationRegister, validationLogin } from "./validatorsroutes";

import { createPool } from "./database";

export const loginGET = (req: Request, res: Response): void => {

    res.render('login')

};

export const loginPOST = async (req: Request, res: Response): Promise <void> => {

    const username: string = req.body.username;

    const password: string = req.body.password;

    validationLogin(username, password);

    try {

        const [rows]: any = await createPool.query('SELECT * FROM users WHERE username = ?', [username]);

        const user = rows[0];

        if (user && await bcrypt.compare(password, user.password)) {
        
        jwt.sign({ id: user.id }, 'secret', { expiresIn: '1h' });
        
        res.render('home', {username});

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

export const home = (req: Request, res: Response): void => {

    res.render('home');

};

export const error = (req: Request, res: Response, next: NextFunction): void => {

    res.sendStatus(404);
    
    next();

};

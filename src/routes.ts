import { Request, Response, NextFunction } from "express";

import { createPool } from "./database";

export const login = (req: Request, res: Response): void => {

    res.render('login')

};

export const register = (req: Request, res: Response): void => {

    res.render('register');

};

export const home = (req: Request, res: Response): void => {

    res.render('home');

};

export const error = (req: Request, res: Response, next: NextFunction): void => {

    res.sendStatus(404);
    
    next();

};

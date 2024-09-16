import { Request, Response, NextFunction } from "express";

import { createPool } from "./database";

export const loginGET = (req: Request, res: Response): void => {

    res.render('login')

};

export const loginPOST = async (req: Request, res: Response): Promise <void> => {

};

export const registerGET = (req: Request, res: Response): void => {

    res.render('register');

};

export const registerPOST = async (req: Request, res: Response): Promise <void> => {

};

export const home = (req: Request, res: Response): void => {

    res.render('home');

};

export const error = (req: Request, res: Response, next: NextFunction): void => {

    res.sendStatus(404);
    
    next();

};

import { Request, Response } from "express";

export const login = (req: Request, res: Response): void => {

    res.render('login')

};

export const register = (req: Request, res: Response): void => {

    res.render('register');

};

export const home = (req: Request, res: Response): void => {

    res.render('home');

};

import { Request, Response } from "express";

export const login = (req: Request, res: Response): void => {

    res.send("Testando...");

};

export const register = (req: Request, res: Response): void => {

    res.send("Registering");

};

export const home = (req: Request, res: Response): void => {

    res.send("Home");

};

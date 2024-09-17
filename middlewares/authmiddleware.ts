import { Request, Response, NextFunction } from 'express';

export const ensureAuthenticated = (req: Request, res: Response, next: NextFunction): void => {

    if (req.session && req.session.userId) return next();
    res.redirect('/login'); 

};
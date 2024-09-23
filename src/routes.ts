import { Request, Response, NextFunction } from "express";

import { loginGETmiddleware, loginPOSTmiddleware, registerGETmiddleware, registerPOSTmiddleware, profilemiddleware, homemiddleware, createtopicGETmiddleware, createtopicPOSTmiddleware, viewtopicsmiddleware, deletetopicmiddleware, createcommentsGETmiddleware, createcommentsPOSTmiddleware, viewcommentsmiddlewares, deletecommentmiddleware, deletecommentPOSTmiddleware, errormiddleware } from "./middlewares";

export const loginGET = (request: Request, response: Response): void => {

    loginGETmiddleware(request, response);

};

export const loginPOST = async (request: Request, response: Response): Promise <void> => {

    await loginPOSTmiddleware(request, response);

};

export const registerGET = (request: Request, response: Response): void => {

    registerGETmiddleware(request, response);

};

export const registerPOST = async (request: Request, response: Response): Promise <void> => {

    await registerPOSTmiddleware(request, response);

};

export const profile = async (request: Request, response: Response): Promise <void> => {

    await profilemiddleware(request, response);

};


export const home = (request: Request, response: Response): void => {

    homemiddleware(request, response);

};

export const createtopicGET = (request: Request, response: Response): void => {

    createtopicGETmiddleware(request, response);

};

export const createtopicPOST = async (request: Request, response: Response): Promise <void> => {

    await createtopicPOSTmiddleware(request, response);

};

export const viewtopics = async (request: Request, response: Response): Promise <void> => {

    await viewtopicsmiddleware(request, response);

};

export const deletetopic = async (request: Request, response: Response): Promise <void> => {

    await deletetopicmiddleware(request, response);

};

export const createcommentsGET = (request: Request, response: Response): void => {

    createcommentsGETmiddleware(request, response);

};

export const createcommentsPOST = async (request: Request, response: Response): Promise <void> => {

    await createcommentsPOSTmiddleware(request, response);

};

export const viewcomments = async (request: Request, response: Response): Promise <void> => {

    await viewcommentsmiddlewares(request, response);

};

export const deletecomment = async (request: Request, response: Response): Promise <void> => {;

    await deletecommentmiddleware(request, response);

};

export const deletecommentPOST = async (request: Request, response: Response): Promise <void> => {

    await deletecommentPOSTmiddleware(request, response);

};  

export const error = (request: Request, response: Response, next: NextFunction): void => {

    errormiddleware(request, response, next);
};

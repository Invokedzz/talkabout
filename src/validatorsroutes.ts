import { body } from "express-validator";

export const validateLogin = [

    body('username')
    .isString()
    .isLength({ min: 3 })
    .withMessage(''),

    body('password')
    .isString()
    .isLength({})
    .withMessage(''),

];

export const validateRegister = [

    body('username')
    .isString()
    .isLength({ min: 3 })
    .withMessage(''),

    body('password')
    .isString()
    .isLength({})
    .withMessage(''),

    body('email')
    .isString()
    .isEmail()
    .isLength({max: 80})
    .withMessage(''),

];

export const sendTopic = [

    body('topic')
    .isString()
    .isLength({})
    .withMessage(''),

    body('theme')
    .isString()
    .isLength({})
    .withMessage(''),

    body('content')
    .isString()
    .isLength({})
    .withMessage(''),

];
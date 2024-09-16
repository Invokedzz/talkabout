import { body } from "express-validator";

import validator from "validator";

export const validateLogin = [

    body('username')
    .isString()
    .isLength({ min: 5, max: 25 })
    .withMessage('Insert a valid username, with (minimum: 5, maximum: 25) characters'),

    body('password')
    .isString()
    .isLength({ min: 4, max: 30 })
    .withMessage('Insert a valid password, with (minimum: 4, maximum: 30) characters'),

];

export const validateRegister = [

    body('username')
    .isString()
    .isLength({ min: 5, max: 25 })
    .withMessage('Insert a valid username, with (minimum: 5, maximum: 25) characters'),

    body('password')
    .isString()
    .isLength({ min: 4, max: 30})
    .withMessage('Insert a valid password, with (minimum: 4, maximum: 30) characters'),

    body('email')
    .isString()
    .isEmail()
    .isLength({max: 80})
    .withMessage('Insert a valid e-mail address (max 80 characters)'),

];

export const sendTopic = [

    body('topic')
    .isString()
    .isLength({ min: 4, max: 25})
    .withMessage('Insert a valid topic, with (minimum: 4, maximum: 25) characters'),

    body('theme')
    .isString()
    .isLength({ min: 4, max: 50 })
    .withMessage('Insert a valid theme, with (minimum: 4, maximum: 50) characters'),

    body('content')
    .isString()
    .isLength({ min: 5, max: 300})
    .withMessage('Insert a valid content, with (minimum: 5, maximum: 300) characters'),

];

export function validationRegister (

    username: string,
    email: string,
    password: string,

): void {

    if (!validator.isEmail(email) && username.length < 5) return;

    if (password.length < 4) return;

    if (!username && !password && !email) return;

};

export function validationLogin (

    username: string,
    password: string,

): void {

    if (validator.isEmpty(username) && validator.isEmpty(password)) return;

    if (username.length < 5 && password.length < 4) return;

};
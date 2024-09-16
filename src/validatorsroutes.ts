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

    body('title')
    .isString()
    .isLength({ min: 4, max: 25})
    .withMessage('Insert a valid topic, with (minimum: 4, maximum: 25) characters'),

    body('theme')
    .isString()
    .isLength({ min: 4, max: 50 })
    .withMessage('Insert a valid theme, with (minimum: 4, maximum: 50) characters'),

    body('text')
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

export function validateemptytopic (

    title: string,
    theme: string,
    text: string,
    
): void {

    if (validator.isEmpty(title) && validator.isEmpty(theme)) return;

    if (validator.isEmpty(text)) return;

};

export function validateTopic (

    title: string,
    theme: string,
    text: string,

): void {

    if (title.length < 4 && title.length > 25) return;

    if (theme.length < 4 && theme.length > 50) return;

    if (text.length < 5 && text.length > 300) return;

};
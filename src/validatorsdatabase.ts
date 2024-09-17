import validator from "validator";

export function verifyid (
    
    id: string,

): void {

    if (!id && id.length < 0) throw new Error("Something went wrong with the id");

};

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
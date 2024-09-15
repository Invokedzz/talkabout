import mysql from "mysql2/promise";

import dotenv from "dotenv";

dotenv.config({
    path: __dirname + '/file.env' });

const userkey = process.env.SQL_USER;

const passwordkey = process.env.SQL_PASSWORD;

export const createPool = mysql.createPool({

    host: 'localhost',
    user: userkey,
    password: passwordkey,
    database: 'talkabout',
    waitForConnections: true,
    connectionLimit: 10,
    maxIdle: 10,
    idleTimeout: 60000,
    queueLimit: 0

});
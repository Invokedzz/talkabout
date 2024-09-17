import express, { Request, Response } from "express";

import helmet from "helmet";

import session from "express-session";

import { Sequelize } from "sequelize";

import connectSessionSequelize from 'connect-session-sequelize';

import csurf from "csurf";

import morgan from "morgan";

import compression from "compression";

const app = express();

export function security (): void {

    app.use(helmet({

        contentSecurityPolicy: false,
        dnsPrefetchControl: { allow: false },
        frameguard: { action: 'deny' },
        hidePoweredBy: true,
        referrerPolicy: { policy: 'no-referrer' },
        xssFilter: true,
        hsts: { maxAge: 31536000, includeSubDomains: true, preload: true },
        ieNoOpen: true,
        noSniff: true,

    }));

    const sequelize = new Sequelize('database', 'username', 'password', {

        host: 'localhost',
        dialect: 'mysql',

    });

    const SequelizeStore = connectSessionSequelize(session.Store);

    const sessionStore = new SequelizeStore({

    db: sequelize,

    });

    app.use(session({

        secret: 'ILOVELINKINPARKANDTHEIRNEWSINGERHAHAHA',
        resave: false,
        saveUninitialized: true,
        cookie: { secure: true, httpOnly: true },
        store: sessionStore,

    }));

    app.use(compression({

        level: 9, 
        threshold: 1024,
        filter: (req: Request, res: Response) => {
            return /text\/html/.test(res.getHeader('Content-Type') as string);
        },
        memLevel: 9, 
        chunkSize: 16384, 

    }));

    const csrf = csurf({ cookie: { httpOnly: true, secure: true } });

    app.use(csrf);

    app.use(morgan('combined'));


};

import express from "express";

import helmet from "helmet";

import session from "express-session";

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

    app.use(session({

        secret: 'ILOVELINKINPARKANDTHEIRNEWSINGERHAHAHA',
        resave: false,
        saveUninitialized: true,
        cookie: { secure: true, httpOnly: true },

    }));

};

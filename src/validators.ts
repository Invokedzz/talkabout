import helmet from "helmet";

import express from "express";

import rateLimit from "express-rate-limit";

import session from "express-session";

const app = express();

export class validatingthings {

    private session (): void {

        app.use(session({

            secret: 'ILOVELINKINPARKANDTHEIRNEWSINGERHAHAHA',
            resave: false,
            saveUninitialized: true,
            cookie: { secure: true, httpOnly: true },

        }));

    };

    private startlimiter (): void {

        const limiter = rateLimit({

            windowMs: 15 * 60 * 1000,
            max: 100,

        });

        app.use(limiter);

    };

    private helmetstart (): void {

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

    };

    public validatestart (): void {

        this.helmetstart();

        this.startlimiter();

        this.session();

    };

}
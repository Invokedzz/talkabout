import express from "express";

import { home, login, register, error } from "./routes";

import { validateLogin, validateRegister, sendTopic } from "./validatorsroutes";

import path from "path";

import { engine } from "express-handlebars";

import rateLimit from "express-rate-limit";

const app = express();

const port = process.env.PORT || 8443;

app.engine('handlebars', engine ({

    defaultLayout: 'main',
    partialsDir: path.join(__dirname, '../views/partials'),

}));

app.set('view engine', 'handlebars');

app.set('views', path.join(__dirname, '../views'));

export class myserver {

    private limiter (): void {

        const limiter = rateLimit({

            windowMs: 15 * 60 * 1000,
            max: 100,
            standardHeaders: true,
            legacyHeaders: false

        });

        app.use(limiter);

    };

    private expresschanges (): void {

        app.use(express.json());

        app.use(express.urlencoded({ extended: true }));

        app.use(express.static('public'));

    };

    private serverget (): void {

        app.get('/', validateLogin, login);

        app.get('/register', validateRegister, register);

        app.get('/home', home);

        app.get('*', error);

    };

    public listen (): void {

        this.limiter();

        this.expresschanges();

        this.serverget();

            app.listen(port, (): void => {

                console.log(`http://localhost:${port}`);

        });

    };

};


export default myserver;
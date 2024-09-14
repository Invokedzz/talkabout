import express from "express";

import validatingthings from "./validators";

import { home, login, register } from "./routes";

const app = express();

const port = process.env.PORT || 8443;

export class myserver {

    private expresschanges (): void {

        app.use(express.json());

        app.use(express.urlencoded({ extended: true }));

        const validate = new validatingthings();
        app.use(validate.validatestart);

    };

    private serverget (): void {

        app.get('/', login);

        app.get('/register', register);

        app.get('/home', home);

    };

    public listen (): void {

        this.expresschanges();

        this.serverget();

            app.listen(port, (): void => {

                console.log(`http://localhost:${port}`);

            });

        };

    };

export default myserver;
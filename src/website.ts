import express from "express";

import { home, login, register } from "./routes";

import { validateLogin, validateRegister, sendTopic } from "./validatorsroutes";

import path from "path";

import { engine } from "express-handlebars";

const app = express();

const port = process.env.PORT || 8443;

app.engine('handlebars', engine ({

    defaultLayout: 'main',
    partialsDir: path.join(__dirname, '../views/partials'),

}));

app.set('view engine', 'handlebars');

app.set('views', path.join(__dirname, '../views'));

export class myserver {

    private expresschanges (): void {

        app.use(express.json());

        app.use(express.urlencoded({ extended: true }));

        app.use(express.static('public'));

    };

    private serverget (): void {

        app.get('/', validateLogin, login);

        app.get('/register', validateRegister, register);

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
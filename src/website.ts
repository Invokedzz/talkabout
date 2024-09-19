import express from "express";

import { 

    home,
     loginGET,
      loginPOST,
       registerGET,
        registerPOST,
        createtopicGET,
        createtopicPOST,
        viewtopics,
        deletetopic,
        profile,
        createcommentsGET,
        createcommentsPOST,
        viewcomments,
         error,

        } from "./routes";


import { validateLogin, validateRegister, sendTopic, sendcomment } from "./validatorsroutes";

import { engine } from "express-handlebars";

import rateLimit from "express-rate-limit";

import path from "path";

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

        app.get('/', validateLogin, loginGET);

        app.get('/register', validateRegister, registerGET);

        app.get('/home', home);

        app.get('/profile', profile);

        app.get('/createtopic', sendTopic, createtopicGET);

        app.get('/receivetopics', createtopicPOST);

        app.get('/viewtopics', viewtopics);

        app.get('/comment/:id', sendcomment, createcommentsGET);

        app.get('/seecomments/:topicid', viewcomments);

        app.get('*', error);

    };

    private serverpost (): void {

        app.post('/registeruser', validateRegister, registerPOST);

        app.post('/home', validateLogin, loginPOST);

        app.post('/sendcomments/:id', sendcomment, createcommentsPOST);

        app.post('/receivetopics', sendTopic, createtopicPOST);

        app.post('/deletetopic/:id', sendTopic, deletetopic);

    };

    public listen (): void {
        
        this.limiter();

        this.expresschanges();

        this.serverget();

        this.serverpost();

            app.listen(port, (): void => {

                console.log(`http://localhost:${port}`);
    
            });

    };

};


export default myserver;
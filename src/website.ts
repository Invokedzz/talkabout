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
        deletecomment,
        deletecommentPOST,
         error,

        } from "./routes";


import { validateLogin, validateRegister, sendTopic, sendcomment } from "./validatorsroutes";

import { engine } from "express-handlebars";

import rateLimit from "express-rate-limit";

import path from "path";

const application = express();

const port = process.env.PORT || 8444;

application.engine('handlebars', engine ({

    defaultLayout: 'main',
    partialsDir: path.join(__dirname, '../views/partials'),

}));

application.set('view engine', 'handlebars');

application.set('views', path.join(__dirname, '../views'));

export class myserver {

    private limiter (): void {

        const limiter = rateLimit({

            windowMs: 15 * 60 * 1000,
            max: 100,
            standardHeaders: true,
            legacyHeaders: false

        });

        application.use(limiter);

    };

    private expresschanges (): void {

        application.use(express.json());

        application.use(express.urlencoded({ extended: true }));

        application.use(express.static('public'));

    };

    private serverget (): void {

        application.get('/', validateLogin, loginGET);

        application.get('/register', validateRegister, registerGET);

        application.get('/home', home);

        application.get('/profile', profile);

        application.get('/createtopic', sendTopic, createtopicGET);

        application.get('/receivetopics', sendTopic, createtopicPOST);

        application.get('/viewtopics', viewtopics);

        application.get('/comment/:topicid', sendcomment, createcommentsGET);

        application.get('/seecomments/:topicid', viewcomments);

        application.get('/deletecomment/:id', deletecomment);

        application.get('*', error);

    };

    private serverpost (): void {

        application.post('/registeruser', validateRegister, registerPOST);

        application.post('/home', validateLogin, loginPOST);

        application.post('/sendcomments/:topicid', sendcomment, createcommentsPOST);

        application.post('/receivetopics', sendTopic, createtopicPOST);

        application.post('/deletetopic/:id', sendTopic, deletetopic);

        application.post('/deleteconfirmcomment/:id', deletecommentPOST);

    };

    public listen (): void {
        
        this.limiter();

        this.expresschanges();

        this.serverget();

        this.serverpost();

            application.listen(port, (): void => {

                console.log(`http://localhost:${port}`);
    
            });

    };

};


export default myserver;
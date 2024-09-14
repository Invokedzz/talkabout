import express from "express";

const app = express();

const port = process.env.PORT || 8443;

export class myserver {

    private expresschanges (): void {

        app.use(express.json());

        app.use(express.urlencoded({ extended: true }));

    };

    private serverget (): void {



    };

    private serverpost (): void {



    };

    public listen (): void {

        this.expresschanges();

        this.serverget();

        this.serverpost();

        if (require.main === module) {

            app.listen(port, (): void => {

                console.log(`http://localhost:${port}`);

            });

        };

        module.exports = app;

    };

}
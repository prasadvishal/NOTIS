let express = require("express");
let robots = require( "express-robots-txt");
let bodyParser = require("body-parser");
let cors = require("cors");
let methodOverride = require("method-override");
let router = express.Router();

// import * as helmet from "helmet";
// import * as dotenv from "dotenv";
// import * as cors from "cors";
// import { routes } from "./routes";


class App {

    constructor() {

        this.app = express();
        this.bootstrap();
    }

    bootstrap() {

        // if your server is behind a proxy,
        this.app.enable('trust proxy');

        // this.app.use(helmet());
        // if your server is behind a proxy,
        this.app.enable('trust proxy');

        // Url Encoded Data
        this.app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

        //app.use(bodyParser.json({ type: 'text/plain', limit: '50mb' }));

        //to Support JSON Encoded Bodies
        this.app.use(bodyParser.json({ type: 'application/json', limit: '50mb' }));

        this.app.use(methodOverride('X-HTTP-Method-Override'));
        // this.app.use(expressValidator(customValidator));

        this.app.use(robots({ UserAgent: '*', Disallow: '/' }));
        this.app.use(cors({origin: '*','exposedHeaders' : ['X-Total-Count','Content-Type']}));

        // dotenv.config();
        let apiRoute = require('./routes/nseRoutes') (this.app, router);


        this.app.use("/", robots);
    }
}

let app = new App().app;
module.exports = app;
 

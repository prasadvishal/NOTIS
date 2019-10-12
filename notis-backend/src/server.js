let config = require('./config/Config');
let app = require('./app');
let express = require("express");

let router = express.Router();


app.listen(config.PORT, () => {
    var apiRoute = require('./routes/nseRoutes') (app, router);

    console.log('Notis Server server listening on port ' + config.PORT);
});

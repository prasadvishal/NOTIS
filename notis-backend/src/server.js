let config = require('./config/Config');
let app = require('./app');
let express = require("express");
let mysql = require('mysql');

let router = express.Router();


app.listen(config.PORT, () => {
    var apiRoute = require('./routes/nseRoutes') (app, router);
    global.DBConnection = null;
    createDbConnection();
    console.log('Notis Server server listening on port ' + config.PORT);
});

function createDbConnection(){
	var con = mysql.createConnection({
          //host: "10.201.0.11",
          host: "localhost",
          user: "root",
          password: "Root_user@123",
          database: "exchange"
        });

        con.connect(function(err) {
          if (err) {
            console.log("Connection Error ------> ",err)
            throw err; 
          }else{
            console.log("Db Connected.")
            global.DBConnection = con;
          }
        });
}
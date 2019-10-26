let config = require('./config/Config');
let app = require('./app');
let express = require("express");
let mysql = require('mysql');
var Sequelize = require('sequelize');
let router = express.Router();

global.C = require('./config/Constants');



app.listen(config.PORT, () => {
    var apiRoute = require('./routes/nseRoutes') (app, router);
    global.DBConnection = null;
    // createDbConnection();
    console.log('Notis Server server listening on port ' + config.PORT);
});

// function createDbConnection(){
// 	var con = mysql.createConnection({
//           //host: "10.201.0.11",
//           host: "localhost",
//           user: "root",
//           password: "root",
//           database: "exchange"
//         });

//         con.connect(function(err) {
//           if (err) {
//             console.log("Connection Error ------> ",err)
//             throw err; 
//           }else{
//             console.log("Db Connected.")
//             global.DBConnection = con;
//           }
//         });
// }

let mysql_db = {
  database: "exchange",
  user: "root",
  password: "root",
  host: "localhost"
}
//------------MySQL Connection ------------//
var sequelize = new Sequelize(mysql_db.database, mysql_db.user, mysql_db.password, {
  host: mysql_db.host,
  dialect: 'mysql',
  operatorsAliases: false,

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

sequelize.authenticate().then(() => {
    console.log('Connected to MySQL ' + mysql_db.database + ' database.');
    global.DBConnection = sequelize;
}).catch(err => {
    console.error('Unable to connect to the database ' + mysql_db.database + ' :', err);
    global.DBConnection = null;
});
//------------MySQL Connection ------------//
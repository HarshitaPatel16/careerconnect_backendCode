const mysql = require("mysql2");
const dbConfig = require("./db.config");

var connection = mysql.createPool({
  host: dbConfig.HOST,
  user: dbConfig.USER,
  password: dbConfig.PASSWORD,
  database: dbConfig.DB
});

connection.getConnection((error, connection) => {
    if (error) {
      console.log(error); // Connection failed, reject the promise with the error
    } else {
        console.log("Database Connected Successfuly"); // Connection successful, resolve the promise with the connection object
    }
  });

module.exports = connection;

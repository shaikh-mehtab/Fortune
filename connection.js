const mysql = require("mysql2");

const connection = mysql.createPool({
  host: "127.0.0.1",
  user: "root",
  password: "DB@root123#",
  database: "fortune_db",
});

if (connection) {
  console.log("Connected the successfully");
} else {
  console.log("error to connecting the database");
}

module.exports = connection.promise();

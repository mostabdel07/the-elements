import mysql from "promise-mysql";
import config from "./../config";

const connection = mysql.createConnection({
  host: "localhost",
  database: "TheElements",
  //user: config.user,
  user: "root",
  password: "root",
});

const getConnection = () => {
  return connection;
};

module.exports = {
  getConnection,
};

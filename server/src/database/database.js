import mysql from "promise-mysql";
import config from "./../config";

const connection = mysql.createConnection({
  host: "127.0.0.1",
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

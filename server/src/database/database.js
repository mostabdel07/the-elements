import mysql from "promise-mysql";
import config from "./../config";

const connection = mysql.createConnection({
  host: config.host,
  database: "TheElements",
  //user: config.user,
  user: "root",
  password: "",
});

const getConnection = () => {
  return connection;
};

module.exports = {
  getConnection,
};

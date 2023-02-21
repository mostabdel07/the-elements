import { getConnection } from "../database/database";
import { methods as userController } from "./user.controller";
//carrega del paquet jsonwebtoken
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
  try {
    const connection = await getConnection();
    const users = await connection.query("SELECT * FROM users");

    const { _username, _password } = req.body;
    const accessTokenSecret = "SDDSZFSDSSDSDsdssdszffdzxfdzxz4534drgctfhfdr";

    const user = users.find((u) => {
      return u.name === _username && u.password === _password;
    });

    console.log(req.body);
    console.log("usuario encontrado " + user);
    if (user) {
      const accessToken = jwt.sign(
        { username: user.name, password: user.password },
        accessTokenSecret,
        { expiresIn: "1h" }
      );
      console.log(accessToken);
      res.json(accessToken);
    } else {
      res.send("Incorrect username or password");
    }
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

export const methods = {
  login,
};

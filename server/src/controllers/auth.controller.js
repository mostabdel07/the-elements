import { getConnection } from "../database/database";
import { methods as userController } from "./user.controller";
//carrega del paquet jsonwebtoken
const jwt = require("jsonwebtoken");

const tokens_list = [];

const login = async (req, res) => {
  try {
    const connection = await getConnection();
    const { username, password } = req.body;
    const accessTokenSecret = "SDDSZFSDSSDSDsdssdszffdzxfdzxz4534drgctfhfdr";

    const user = await connection.query(`SELECT * FROM users
                                        WHERE name = '${username}'
                                        AND password = '${password}'`);

    console.log(user);

    if (user.length > 0) {
      const accessToken = jwt.sign(
        { username: user.name, password: user.password },
        accessTokenSecret,
        { expiresIn: "1h" }
      );
      tokens_list.push(accessToken);
    
      res.json(accessToken);
    } else {
      res.send({message:"Incorrect username or password"});
    }
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

const logout = (req,res) =>{
  try {
    const { token } = req.body;
    tokens_list = tokens_list.filter(t => t !== token)
    console.log(tokens_list);
    res.send({message: "Logout successfull"})
  } catch (error) {
    res.status(500);
    res.send(error.message)
  }
}

export const methods = {
  login,
  logout
};

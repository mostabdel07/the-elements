import { getConnection } from "../database/database";

//*Developer CRUD

const getDevs = async (req, res) => {
  try {
    const connection = await getConnection();
    const result = await connection.query("SELECT * FROM developers");
    console.log(result);
    res.json(result);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

const getDev = async (req, res) => {
  try {
    const { id } = req.params;
    const connection = await getConnection();
    const result = await connection.query(
      `SELECT * FROM developers WHERE id = ${id}`
    );
    console.log(result);
    res.json(result);
  } catch (error) {
    res.status(500);
    res.send(error);
  }
};

const addDev = async (req, res) => {
  try {
    const {_id, _name, _description, _image, _type } = req.body;
    console.log(req.body);
    //best practice ?
    if (
      _name === undefined ||
      _description === undefined ||
      _image === undefined ||
      _type === undefined
    ) {
      res
        .status(400)
        .json({ message: "Bad Request, null values are not allowed" });
    }

    const developer = {_id, _name, _description, _image, _type };
    const connection = await getConnection();
    const result = await connection.query(
      // "INSERT INTO developers SET ?",
      // developer
      `INSERT INTO developers (id,name,description,image,type) VALUES
      (${_id}, '${_name}', '${_description}', '${_image}', '${_type}')`
    );
    res.json({ message: "Developer added" });
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

//Update description field
const updateDev = async (req, res) => {
  console.log("llego al update");
  console.log(req.body);
  try {
    const { id } = req.params;
    const { description } = req.body;

    if (id === undefined || description === undefined) {
      res
        .status(400)
        .json({ message: "Bad Request, null values are not allowed" });
    }
    const user = { id };
    const connection = await getConnection();
    const result = await connection.query(
      // "UPDATE developers SET ? WHERE id = ?",
      // [user, description]
      `UPDATE developers SET description = '${description}'
       WHERE id = ${id}` 
    );
    console.log(result);
    res.json(result);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

const deleteDev = async (req, res) => {
  try {
    const { id } = req.params;
    const connection = await getConnection();
    const result = await connection.query(
      "DELETE FROM developers WHERE id = ?",
      id
    );
    res.json({ message: "Developer deleted" });
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

export const methods = {
  getDevs,
  getDev,
  addDev,
  updateDev,
  deleteDev,
};

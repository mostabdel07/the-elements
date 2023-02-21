import { getConnection } from "../database/database";

// List all users
const getUsers = async (req, res) => {
  try {
    const connection = await getConnection();
    const result = await connection.query("SELECT * FROM users");
    console.log(result);
    res.json(result);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

// Get one user filtered by name
const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const connection = await getConnection();
    const result = await connection.query(
      "SELECT * FROM users WHERE id = ?",
      id
    );
    res.json(result);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

// Add user to database
const addUser = async (req, res) => {
  try {
    const { name, password } = req.body;

    if (name === undefined || password === undefined) {
      res.status(400).json({ message: "Bad Request, Please fill all fields." });
    }

    const user = { name, password };
    const connection = await getConnection();
    // Traditional Query: "INSERT INTO clients (name, programmers) VALUES ('+dni+', '+name+')";
    await connection.query("INSERT INTO users SET ?", user);
    res.json({ message: "User added" });
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

// Update user
const updateUser = async (req, res) => {
  try {
    console.log(req.params);
    const { id } = req.params;
    const { name } = req.body;

    if (id === undefined || name === undefined) {
      res.status(400).json({ message: "Bad Request, Please fill all fields." });
    }

    const user = { id };
    const connection = await getConnection();
    const result = await connection.query(
      "UPDATE users SET ? WHERE id = ?",
      [user, name]
    );
    res.json(result);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

// Delete one user
const deleteUser = async (req, res) => {
  try {
    console.log(req.params);
    const { id } = req.params;
    const connection = await getConnection();
    const result = await connection.query(
      "DELETE FROM users WHERE id = ?",
      id
    );
    res.json({ message: "User deleted" });
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

export const methods = {
  getUsers,
  getUser,
  addUser,
  updateUser,
  deleteUser,
};

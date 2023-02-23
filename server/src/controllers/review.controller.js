import { getConnection } from "../database/database";

// List all reviews
const getReviews = async (req, res) => {
  try {
    const connection = await getConnection();
    const result = await connection.query("SELECT * FROM reviews");
    console.log(result);
    res.json(result);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

// Get one review filtered by id
const getReview = async (req, res) => {
  try {
    const { id } = req.params;
    const connection = await getConnection();
    const result = await connection.query(
      "SELECT * FROM reviews WHERE id = ?",
      id
    );
    res.json(result);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

// Add review to database
const addReview = async (req, res) => {
  try {
    console.log(req.body);
    const { _username, _profileUrl, _comment } = req.body;
    const user_id = 3;

    if (
      _username === undefined ||
      _profileUrl === undefined ||
      _comment === undefined ||
      user_id === undefined
    ) {
      res.status(400).json({ message: "Bad Request, Please fill all fields." });
    }

    // const review = { _username, _profileUrl, _comment, user_id };
    // await connection.query("INSERT INTO reviews SET ?", review);

    const connection = await getConnection();
    await connection.query(
      `INSERT INTO reviews (id, username, profileUrl, comment, user_id, created_at, updated_at) VALUES (NULL, "${_username}", "${_profileUrl}", "${_comment}", ${user_id}, NULL, NULL)`
    );
    res.json({ message: "review added" });
  } catch (error) {
    console.log("va al error");
    res.status(500);
    res.send(error.message);
  }
};

// Update review
const updateReview = async (req, res) => {
  try {
    console.log("entro update");
    console.log(req.params);
    const { id } = req.params;
    const { _comment } = req.body;

    if (id === undefined || _comment === undefined) {
      res.status(400).json({ message: "Bad Request, Please fill all fields." });
    }

    // const user = { id };
    const connection = await getConnection();
    // const result = await connection.query("UPDATE reviews SET ? WHERE id = ?", [
    //   user,
    //   comment,
    // ]);

    const result = await connection.query(
      `UPDATE reviews SET comment = "${_comment}" WHERE id = ${id}`
    );

    res.json(result);
  } catch (error) {
    console.log("error");
    res.status(500);
    res.send(error.message);
  }
};

// Delete one review
const deleteReview = async (req, res) => {
  try {
    console.log(req.params);
    const { id } = req.params;
    const connection = await getConnection();
    const result = await connection.query(
      "DELETE FROM reviews WHERE id = ?",
      id
    );
    res.json({ message: "User deleted" });
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

export const methods = {
  getReviews,
  getReview,
  addReview,
  updateReview,
  deleteReview,
};

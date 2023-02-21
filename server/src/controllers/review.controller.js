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
    const { username, profileUrl, comment } = req.body;

    if (
      username === undefined ||
      profileUrl === undefined ||
      comment === undefined
    ) {
      res.status(400).json({ message: "Bad Request, Please fill all fields." });
    }

    const review = { username, profileUrl, comment };
    const connection = await getConnection();
    // Traditional Query: "INSERT INTO clients (name, programmers) VALUES ('+dni+', '+name+')";
    //await connection.query("INSERT INTO users SET ?", review);
    await connection.query(
      "INSERT INTO `reviews` (`id`, `username`, `profileUrl`, `comment`, `user_id`, `created_at`, `updated_at`) VALUES (NULL, 'desde', 'la', 'api3', '1', NULL, NULL)"
    );
    res.json({ message: "Review added" });
  } catch (error) {
    console.log("va al error");
    res.status(500);
    res.send(error.message);
  }
};

// Update review
const updateReview = async (req, res) => {
  try {
    console.log(req.params);
    const { id } = req.params;
    const { name } = req.body;

    if (id === undefined || name === undefined) {
      res.status(400).json({ message: "Bad Request, Please fill all fields." });
    }

    const user = { id };
    const connection = await getConnection();
    const result = await connection.query("UPDATE reviews SET ? WHERE id = ?", [
      user,
      name,
    ]);
    res.json(result);
  } catch (error) {
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

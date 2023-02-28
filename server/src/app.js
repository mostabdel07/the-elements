import express from "express";
import morgan from "morgan";
// Routes
import userRoutes from "./routes/user.routes";
import teamRoutes from "./routes/team.routes";
import reviewRoutes from "./routes/review.routes";

const app = express();

//CORS
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "*");
  res.header("Allow", "POST, GET, PUT, DELETE, OPTIONS");
  next();
});

// Settings
app.set("port", 4001);

// Middlewares
app.use(morgan("dev")); // Show requests in console
app.use(express.json()); // Server understand json format

// Routes
app.use(userRoutes);
app.use(teamRoutes);
app.use(reviewRoutes);

export default app;

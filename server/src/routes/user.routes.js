import { Router } from "express";
import { methods as userController } from "../controllers/user.controller";
import { methods as authController } from "../controllers/auth.controller";

const router = Router(); // Manage requests

router.get("/", (req, res) => {
  res.send("Welcome!");
});

router.get("/users", userController.getUsers);
router.get("/users/:name", userController.getUser);
router.post("/users", userController.addUser);
router.put("/users/:name", userController.updateUser);
router.delete("/users/:name", userController.deleteUser);

//login
//router.get("/login", authController.login);
router.post("/login", authController.login);

export default router;

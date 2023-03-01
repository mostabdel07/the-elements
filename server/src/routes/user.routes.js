import { Router } from "express";
import { methods as userController } from "../controllers/user.controller";
import { methods as authController } from "../controllers/auth.controller";

const router = Router(); // Manage requests

router.get("/", (req, res) => {
  res.send("Welcome!");
});

router.get("/users", userController.getUsers);
// router.get("/users/:id", userController.getUser);
router.get("/users/:username", userController.getUserByUsername);
router.post("/users", userController.addUser);
router.put("/users/:id", userController.updateUser);
router.delete("/users/:id", userController.deleteUser);

//login
//router.get("/login", authController.login);
router.post("/login", authController.login);

export default router;

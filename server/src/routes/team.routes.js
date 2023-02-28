import { Router } from "express";
import { methods as devController } from "../controllers/developer.controller";

const router = Router();

router.get("/team", devController.getDevs);
router.post("/team", devController.addDev);
router.get("/team/:id", devController.getDev);
router.put("/team/:id", devController.updateDev);
router.delete("/team/:id", devController.deleteDev);

export default router;

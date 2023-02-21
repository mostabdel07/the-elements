import { Router } from "express";
import { methods as reviewController } from "../controllers/review.controller";

const router = Router(); // Manage requests

router.get("/reviews", reviewController.getReviews);
router.get("/reviews/:id", reviewController.getReview);
router.post("/reviews", reviewController.addReview);
router.put("/reviews/:id", reviewController.updateReview);
router.delete("/reviews/:id", reviewController.deleteReview);

export default router;

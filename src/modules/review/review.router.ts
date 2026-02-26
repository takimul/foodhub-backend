import { Router } from "express";
import { createReview, getMealReviews } from "./review.controller";
import { requireAuth, requireRole } from "../../middlewares/auth";

const router = Router();

// Customer only
router.post("/", requireAuth, requireRole("CUSTOMER"), createReview);

// Public
router.get("/:mealId", getMealReviews);

export const reviewRouter = router;

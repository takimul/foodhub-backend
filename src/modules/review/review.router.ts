import { Router } from "express";
import { createReview, getMealReviews } from "./review.controller";
import { requireAuth, requireRole } from "../../middlewares/auth";
import { createReviewSchema } from "./review.validation";
import { validateRequest } from "../../middlewares/validateRequest";

const router = Router();

// Customer only
// router.post("/", requireAuth, requireRole("CUSTOMER"), createReview);
router.post(
  "/",
  requireAuth,
  requireRole("CUSTOMER"),
  validateRequest(createReviewSchema),
  createReview,
);

// Public
router.get("/:mealId", getMealReviews);

export const reviewRouter = router;

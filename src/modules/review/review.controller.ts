import type { Request, Response } from "express";
import { reviewService } from "./review.service";
import { asyncHandler } from "../../utils/asyncHandler";

export const createReview = asyncHandler(
  async (req: Request, res: Response) => {
    const user = (req as any).user as { id: string };

    const { mealId, rating, comment } = req.body;

    if (!mealId || !rating || !comment) {
      return res.status(400).json({
        success: false,
        message: "Meal, rating and comment are required",
      });
    }

    if (rating < 1 || rating > 5) {
      return res.status(400).json({
        success: false,
        message: "Rating must be between 1 and 5",
      });
    }

    const result = await reviewService.createReview(user.id, {
      mealId,
      rating,
      comment,
    });

    res.status(201).json({
      success: true,
      message: "Review added successfully",
      data: result,
    });
  },
);

export const getMealReviews = asyncHandler(
  async (req: Request, res: Response) => {
    const { mealId } = req.params;

    if (!mealId || typeof mealId !== "string") {
      return res.status(400).json({
        success: false,
        message: "Meal ID is required",
      });
    }

    const result = await reviewService.getMealReviews(mealId);

    res.status(200).json({
      success: true,
      data: result,
    });
  },
);

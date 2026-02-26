import { AppError } from "../../errors/AppError";
import { prisma } from "../../lib/prisma";

const createReview = async (
  userId: string,
  payload: { mealId: string; rating: number; comment: string },
) => {
  const existing = await prisma.review.findFirst({
    where: {
      userId,
      mealId: payload.mealId,
    },
  });

  if (existing) {
    throw new AppError(400, "You already reviewed this meal");
  }

  const review = await prisma.review.create({
    data: {
      userId,
      mealId: payload.mealId,
      rating: payload.rating,
      comment: payload.comment,
    },
  });

  const stats = await prisma.review.aggregate({
    where: { mealId: payload.mealId },
    _avg: { rating: true },
  });

  await prisma.meal.update({
    where: { id: payload.mealId },
    data: {
      averageRating: stats._avg.rating || 0,
    },
  });

  return review;
};

const getMealReviews = async (mealId: string) => {
  return prisma.review.findMany({
    where: { mealId },
    include: {
      user: {
        select: { id: true, name: true },
      },
    },
    orderBy: { createdAt: "desc" },
  });
};

export const reviewService = {
  createReview,
  getMealReviews,
};

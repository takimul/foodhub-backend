import { prisma } from "../../lib/prisma";

const createReview = async (
  userId: string,
  payload: { mealId: string; rating: number; comment: string },
) => {
  return prisma.review.create({
    data: {
      userId,
      mealId: payload.mealId,
      rating: payload.rating,
      comment: payload.comment,
    },
  });
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

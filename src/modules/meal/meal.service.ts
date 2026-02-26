import { prisma } from "../../lib/prisma";

const createMeal = async (userId: string, payload: any) => {
  return prisma.meal.create({
    data: {
      ...payload,
      providerId: userId,
    },
  });
};

const getAllMeals = async (filters: any) => {
  return prisma.meal.findMany({
    where: {
      isAvailable: true,
      categoryId: filters.categoryId,
    },
    include: {
      category: true,
      provider: {
        select: { id: true, name: true },
      },
    },
  });
};

const getSingleMeal = async (id: string) => {
  return prisma.meal.findFirst({
    where: {
      id,
      isAvailable: true,
    },
    include: {
      category: true,
      provider: {
        select: {
          id: true,
          name: true,
          image: true,
        },
      },
    },
  });
};

const updateMeal = async (mealId: string, userId: string, payload: any) => {
  return prisma.meal.updateMany({
    where: {
      id: mealId,
      providerId: userId,
    },
    data: payload,
  });
};

const deleteMeal = async (mealId: string, userId: string) => {
  return prisma.meal.deleteMany({
    where: {
      id: mealId,
      providerId: userId,
    },
  });
};

export const mealService = {
  createMeal,
  getAllMeals,
  getSingleMeal,
  updateMeal,
  deleteMeal,
};

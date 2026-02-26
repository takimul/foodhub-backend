import { paginationHelper } from "../../helpers/paginationHelper";
import { prisma } from "../../lib/prisma";

const createMeal = async (userId: string, payload: any) => {
  return prisma.meal.create({
    data: {
      ...payload,
      providerId: userId,
    },
  });
};

const getAllMeals = async (query: any) => {
  const { skip, limit } = paginationHelper(query);

  const { minPrice, maxPrice, categoryId, search } = query;

  const filters: any = {
    isAvailable: true,
    isDeleted: false,
  };

  if (categoryId) {
    filters.categoryId = categoryId;
  }

  if (minPrice || maxPrice) {
    filters.price = {};
    if (minPrice) filters.price.gte = Number(minPrice);
    if (maxPrice) filters.price.lte = Number(maxPrice);
  }

  if (search) {
    filters.title = {
      contains: search,
      mode: "insensitive",
    };
  }

  const meals = await prisma.meal.findMany({
    where: filters,
    skip: skip,
    take: limit,
    include: {
      category: true,
      provider: {
        select: { id: true, name: true },
      },
    },
  });

  const total = await prisma.meal.count({ where: filters });

  return {
    meta: {
      page: Number(query.page) || 1,
      limit,
      total,
    },
    data: meals,
  };
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
  return prisma.meal.updateMany({
    where: {
      id: mealId,
      providerId: userId,
    },
    data: {
      isDeleted: true,
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

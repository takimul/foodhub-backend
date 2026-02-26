import { prisma } from "../../lib/prisma";

const createCategory = async (payload: { name: string }) => {
  return prisma.category.create({
    data: payload,
  });
};

const getAllCategories = async () => {
  return prisma.category.findMany({
    orderBy: { createdAt: "desc" },
  });
};

const updateCategory = async (id: string, name: string) => {
  return prisma.category.update({
    where: { id },
    data: { name },
  });
};

const deleteCategory = async (id: string) => {
  return prisma.category.delete({
    where: { id },
  });
};

export const categoryService = {
  createCategory,
  getAllCategories,
  updateCategory,
  deleteCategory,
};

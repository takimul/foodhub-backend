import { AppError } from "../../errors/AppError";
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

// const updateCategory = async (id: string, name: string) => {
//   return prisma.category.update({
//     where: { id },
//     data: { name },
//   });
// };
const updateCategory = async (id: string, name: string) => {
  const existing = await prisma.category.findUnique({
    where: { id },
  });

  if (!existing) {
    throw new AppError(404, "Category not found");
  }

  return prisma.category.update({
    where: { id },
    data: { name },
  });
};

const deleteCategory = async (id: string) => {
  const existing = await prisma.category.findUnique({
    where: { id },
  });

  if (!existing) {
    throw new AppError(404, "Category not found");
  }

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

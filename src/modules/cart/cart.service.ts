import { prisma } from "../../lib/prisma";
import { AppError } from "../../errors/AppError";

const addToCart = async (userId: string, mealId: string, quantity: number) => {
  const meal = await prisma.meal.findUnique({
    where: { id: mealId },
  });

  if (!meal || meal.isDeleted) {
    throw new AppError(404, "Meal not found");
  }

  return prisma.cartItem.upsert({
    where: {
      userId_mealId: { userId, mealId },
    },
    update: {
      quantity: { increment: quantity },
    },
    create: {
      userId,
      mealId,
      quantity,
    },
    include: {
      meal: true,
    },
  });
};

const getUserCart = async (userId: string) => {
  return prisma.cartItem.findMany({
    where: { userId },
    include: { meal: true },
  });
};

const updateCartItem = async (
  userId: string,
  cartItemId: string,
  quantity: number,
) => {
  const item = await prisma.cartItem.findUnique({
    where: { id: cartItemId },
  });

  if (!item || item.userId !== userId) {
    throw new AppError(403, "Unauthorized");
  }

  return prisma.cartItem.update({
    where: { id: cartItemId },
    data: { quantity },
  });
};

const removeCartItem = async (userId: string, cartItemId: string) => {
  const item = await prisma.cartItem.findUnique({
    where: { id: cartItemId },
  });

  if (!item || item.userId !== userId) {
    throw new AppError(403, "Unauthorized");
  }

  await prisma.cartItem.delete({
    where: { id: cartItemId },
  });
};

const clearCart = async (userId: string) => {
  await prisma.cartItem.deleteMany({
    where: { userId },
  });
};

export const cartService = {
  addToCart,
  getUserCart,
  updateCartItem,
  removeCartItem,
  clearCart,
};

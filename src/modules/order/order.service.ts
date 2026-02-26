import { prisma } from "../../lib/prisma";

const createOrder = async (userId: string, payload: any) => {
  const { items, address } = payload;

  let total = 0;

  const orderItemsData = await Promise.all(
    items.map(async (item: any) => {
      const meal = await prisma.meal.findUnique({
        where: { id: item.mealId },
      });

      if (!meal) throw new Error("Meal not found");

      total += meal.price * item.quantity;

      return {
        mealId: meal.id,
        quantity: item.quantity,
        price: meal.price,
      };
    }),
  );

  return prisma.order.create({
    data: {
      userId,
      address,
      total,
      items: {
        create: orderItemsData,
      },
    },
    include: {
      items: true,
    },
  });
};

const getMyOrders = async (userId: string) => {
  return prisma.order.findMany({
    where: { userId },
    include: {
      items: {
        include: { meal: true },
      },
    },
    orderBy: { createdAt: "desc" },
  });
};

const getSingleOrder = async (id: string, userId: string) => {
  return prisma.order.findFirst({
    where: { id, userId },
    include: {
      items: {
        include: { meal: true },
      },
    },
  });
};

const getProviderOrders = async (providerId: string) => {
  return prisma.order.findMany({
    where: {
      items: {
        some: {
          meal: {
            providerId,
          },
        },
      },
    },
    include: {
      items: {
        include: { meal: true },
      },
      user: true,
    },
  });
};

const updateOrderStatus = async (orderId: string, status: any) => {
  return prisma.order.update({
    where: { id: orderId },
    data: { status },
  });
};

export const orderService = {
  createOrder,
  getMyOrders,
  getSingleOrder,
  getProviderOrders,
  updateOrderStatus,
};

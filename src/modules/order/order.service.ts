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

const getAllOrders = async () => {
  return prisma.order.findMany({
    include: {
      user: true,
      items: {
        include: {
          meal: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
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
  const order = await prisma.order.findUnique({
    where: { id: orderId },
  });

  if (!order) throw new Error("Order not found");

  const validTransitions: any = {
    PLACED: ["PREPARING", "CANCELLED"],
    PREPARING: ["READY"],
    READY: ["DELIVERED"],
    DELIVERED: [],
    CANCELLED: [],
  };

  if (!validTransitions[order.status].includes(status)) {
    throw new Error("Invalid status transition");
  }

  return prisma.order.update({
    where: { id: orderId },
    data: { status },
  });
};

//provider stats
const getProviderStats = async (providerId: string) => {
  const mealsCount = await prisma.meal.count({
    where: { providerId },
  });

  const orders = await prisma.order.findMany({
    where: {
      items: {
        some: {
          meal: { providerId },
        },
      },
    },
  });

  const totalRevenue = orders.reduce(
    (sum: number, order: (typeof orders)[number]) => sum + order.total,
    0,
  );

  return {
    mealsCount,
    totalOrders: orders.length,
    totalRevenue,
  };
};

export const orderService = {
  createOrder,
  getAllOrders,
  getMyOrders,
  getSingleOrder,
  getProviderOrders,
  updateOrderStatus,
  getProviderStats,
};

import { AppError } from "../../errors/AppError";
import { prisma } from "../../lib/prisma";

// const createOrder = async (userId: string, payload: any) => {
//   const { items, address } = payload;

//   let total = 0;

//   const orderItemsData = await Promise.all(
//     items.map(async (item: any) => {
//       const meal = await prisma.meal.findUnique({
//         where: { id: item.mealId },
//       });

//       if (!meal) throw new Error("Meal not found");

//       total += meal.price * item.quantity;

//       return {
//         mealId: meal.id,
//         quantity: item.quantity,
//         price: meal.price,
//       };
//     }),
//   );

//   return prisma.order.create({
//     data: {
//       userId,
//       address,
//       total,
//       items: {
//         create: orderItemsData,
//       },
//     },
//     include: {
//       items: true,
//     },
//   });
// };

const createOrder = async (userId: string, payload: any) => {
  const { address } = payload;

  // 1️⃣ Get cart items
  const cartItems = await prisma.cartItem.findMany({
    where: { userId },
    include: { meal: true },
  });

  if (!cartItems.length) {
    throw new AppError(400, "Cart is empty");
  }

  // 2️⃣ Calculate total safely from DB
  const total = cartItems.reduce(
    (sum, item) => sum + item.quantity * item.meal.price,
    0,
  );

  // 3️⃣ Create order + order items
  const order = await prisma.order.create({
    data: {
      userId,
      address,
      total,
      items: {
        create: cartItems.map((item) => ({
          mealId: item.mealId,
          quantity: item.quantity,
          price: item.meal.price,
        })),
      },
    },
    include: {
      items: {
        include: { meal: true },
      },
    },
  });

  // 4️⃣ Clear cart after order
  await prisma.cartItem.deleteMany({
    where: { userId },
  });

  return order;
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

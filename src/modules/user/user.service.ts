import { AppError } from "../../errors/AppError";
import { prisma } from "../../lib/prisma";

const getAllUsers = async () => {
  return prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      isActive: true,
      createdAt: true,
    },
    orderBy: { createdAt: "desc" },
  });
};

const updateUserStatus = async (userId: string, isActive: boolean) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!user) {
    throw new AppError(404, "User not found");
  }

  return prisma.user.update({
    where: { id: userId },
    data: { isActive },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      isActive: true,
    },
  });
};

const getSingleUser = async (id: string) => {
  return prisma.user.findUnique({
    where: { id },
  });
};

const updateProfile = async (id: string, payload: any) => {
  return prisma.user.update({
    where: { id },
    data: payload,
  });
};

export const userService = {
  getAllUsers,
  getSingleUser,
  updateUserStatus,
  updateProfile,
};

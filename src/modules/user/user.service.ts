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
  });
};

const getSingleUser = async (id: string) => {
  return prisma.user.findUnique({
    where: { id },
  });
};

const updateUserStatus = async (id: string, isActive: boolean) => {
  return prisma.user.update({
    where: { id },
    data: { isActive },
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

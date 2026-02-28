import { prisma } from "../../lib/prisma";

const getMyProviderProfile = async (userId: string) => {
  return prisma.providerProfile.findUnique({
    where: { userId },
  });
};

const getPublicProvider = async (providerId: string) => {
  const profile = await prisma.providerProfile.findUnique({
    where: { userId: providerId },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          image: true,
        },
      },
    },
  });

  if (!profile) return null;

  const meals = await prisma.meal.findMany({
    where: {
      providerId,
      isAvailable: true,
      isDeleted: false,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return {
    profile,
    meals,
  };
};

const updateProviderProfile = async (userId: string, payload: any) => {
  return prisma.providerProfile.update({
    where: { userId },
    data: payload,
  });
};

export const providerService = {
  getMyProviderProfile,
  updateProviderProfile,
  getPublicProvider,
};

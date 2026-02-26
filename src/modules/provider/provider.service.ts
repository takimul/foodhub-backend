import { prisma } from "../../lib/prisma";

const getMyProviderProfile = async (userId: string) => {
  return prisma.providerProfile.findUnique({
    where: { userId },
  });
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
};

import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),

  emailAndPassword: {
    enabled: true,
  },

  user: {
    additionalFields: {
      role: {
        type: "string",
        required: false,
        defaultValue: "CUSTOMER",
      },
      isActive: {
        type: "boolean",
        required: false,
        defaultValue: true,
      },
    },
  },

  //   events: {
  //     user: {
  //       created: async (user: { id: string; name: string; role: string }) => {
  //         if (user.role === "PROVIDER") {
  //           await prisma.providerProfile.create({
  //             data: {
  //               userId: user.id,
  //               businessName: `${user.name}'s Kitchen`,
  //               address: "Not set",
  //               phone: "Not set",
  //             },
  //           });
  //         }
  //       },
  //     },
  //   },

  session: {
    expiresIn: 60 * 60 * 24 * 7,
  },
});

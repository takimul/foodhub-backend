import type { Request, Response } from "express";
import { auth } from "../../lib/auth";
import { prisma } from "../../lib/prisma";
import { asyncHandler } from "../../utils/asyncHandler";

export const registerUser = asyncHandler(
  async (req: Request, res: Response) => {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Name, email and password are required",
      });
    }

    // 1️⃣ Create user using better-auth
    const result = await auth.api.signUpEmail({
      body: { name, email, password, role },
    });

    // 2️⃣ If provider, create provider profile
    if (role === "PROVIDER") {
      const user = await prisma.user.findUnique({
        where: { email },
      });

      if (user) {
        await prisma.providerProfile.create({
          data: {
            userId: user.id,
            businessName: `${name}'s Kitchen`,
            address: "Not set",
            phone: "Not set",
          },
        });
      }
    }

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: result,
    });
  },
);

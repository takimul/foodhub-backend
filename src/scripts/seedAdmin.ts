import { auth } from "../lib/auth";
import { prisma } from "../lib/prisma";

async function seedAdmin() {
  try {
    const existing = await prisma.user.findUnique({
      where: { email: "admin@foodhub.com" },
    });

    if (existing) {
      console.log("Admin already exists");
      return;
    }

    await auth.api.signUpEmail({
      body: {
        name: "Super Admin",
        email: "admin@foodhub.com",
        password: "admin123",
        role: "ADMIN",
      },
    });

    console.log("Admin seeded successfully");
  } catch (error) {
    console.error(error);
  } finally {
    await prisma.$disconnect();
  }
}

seedAdmin();

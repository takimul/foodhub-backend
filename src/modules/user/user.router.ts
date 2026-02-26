import { Router } from "express";
import { userController } from "./user.controller";
import { requireAuth, requireRole } from "../../middlewares/auth";

const router = Router();

// Admin routes
router.get("/", requireAuth, requireRole("ADMIN"), userController.getAllUsers);

router.patch(
  "/:id/status",
  requireAuth,
  requireRole("ADMIN"),
  userController.updateUserStatus,
);

// Authenticated user routes
router.get("/me", requireAuth, userController.getMyProfile);
router.patch("/me", requireAuth, userController.updateProfile);

export const userRouter = router;

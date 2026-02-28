import { Router } from "express";
import {
  getAllUsers,
  updateUserStatus,
  userController,
} from "./user.controller";
import { requireAuth, requireRole } from "../../middlewares/auth";
import { updateUserStatusSchema } from "./user.validation";
import { validateRequest } from "../../middlewares/validateRequest";

const router = Router();

// Admin routes
router.get("/", requireAuth, requireRole("ADMIN"), getAllUsers);

router.patch(
  "/:id",
  requireAuth,
  requireRole("ADMIN"),
  validateRequest(updateUserStatusSchema),
  updateUserStatus,
);

// Authenticated user routes
router.get("/me", requireAuth, userController.getMyProfile);
router.patch("/me", requireAuth, userController.updateProfile);

export const userRouter = router;

import { Router } from "express";
import { requireAuth, requireRole } from "../../middlewares/auth";
import {
  getMyProfile,
  getPublicProvider,
  updateProfile,
} from "./provider.controller";

const router = Router();

router.get("/me", requireAuth, requireRole("PROVIDER"), getMyProfile);
router.get("/:id", getPublicProvider);
router.patch("/me", requireAuth, requireRole("PROVIDER"), updateProfile);

export const providerRouter = router;

import { Router } from "express";
import { requireAuth, requireRole } from "../../middlewares/auth";
import { getMyProfile, updateProfile } from "./provider.controller";

const router = Router();

router.get("/me", requireAuth, requireRole("PROVIDER"), getMyProfile);

router.patch("/me", requireAuth, requireRole("PROVIDER"), updateProfile);

export const providerRouter = router;

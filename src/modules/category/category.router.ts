import { Router } from "express";
import {
  createCategory,
  getAllCategories,
  updateCategory,
  deleteCategory,
} from "./category.controller";
import { requireAuth, requireRole } from "../../middlewares/auth";
import {
  createCategorySchema,
  updateCategorySchema,
} from "./category.validation";
import { validateRequest } from "../../middlewares/validateRequest";

const router = Router();

// Public
router.get("/", getAllCategories);

// Admin Only
// router.post("/", requireAuth, requireRole("ADMIN"), createCategory);

// router.patch("/:id", requireAuth, requireRole("ADMIN"), updateCategory);

// router.delete("/:id", requireAuth, requireRole("ADMIN"), deleteCategory);
router.post(
  "/",
  requireAuth,
  requireRole("ADMIN"),
  validateRequest(createCategorySchema),
  createCategory,
);

router.patch(
  "/:id",
  requireAuth,
  requireRole("ADMIN"),
  validateRequest(updateCategorySchema),
  updateCategory,
);

router.delete("/:id", requireAuth, requireRole("ADMIN"), deleteCategory);

export const categoryRouter = router;

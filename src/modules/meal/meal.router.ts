import { Router } from "express";
import {
  createMeal,
  getAllMeals,
  updateMeal,
  deleteMeal,
  getSingleMeal,
  getProviderMeals,
} from "./meal.controller";
import { requireAuth, requireRole } from "../../middlewares/auth";
import { createMealSchema, updateMealSchema } from "./meal.validation";
import { validateRequest } from "../../middlewares/validateRequest";

const router = Router();

router.get("/", getAllMeals);
router.get("/:id", getSingleMeal);

router.post(
  "/",
  requireAuth,
  requireRole("PROVIDER"),
  validateRequest(createMealSchema),
  createMeal,
);

router.patch(
  "/:id",
  requireAuth,
  requireRole("PROVIDER"),
  validateRequest(updateMealSchema),
  updateMeal,
);
router.get(
  "/provider/meals",
  requireAuth,
  requireRole("PROVIDER"),
  getProviderMeals,
);

router.delete("/:id", requireAuth, requireRole("PROVIDER"), deleteMeal);

export const mealRouter = router;

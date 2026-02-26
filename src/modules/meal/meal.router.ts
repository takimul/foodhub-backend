import { Router } from "express";
import {
  createMeal,
  getAllMeals,
  updateMeal,
  deleteMeal,
  getSingleMeal,
} from "./meal.controller";
import { requireAuth, requireRole } from "../../middlewares/auth";

const router = Router();

router.get("/", getAllMeals);
router.get("/:id", getSingleMeal);

router.post("/", requireAuth, requireRole("PROVIDER"), createMeal);

router.patch("/:id", requireAuth, requireRole("PROVIDER"), updateMeal);

router.delete("/:id", requireAuth, requireRole("PROVIDER"), deleteMeal);

export const mealRouter = router;

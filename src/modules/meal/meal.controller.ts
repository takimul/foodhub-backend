import type { Request, Response } from "express";
import { mealService } from "./meal.service";

export const createMeal = async (req: Request, res: Response) => {
  const user = (req as any).user as { id: string };

  const result = await mealService.createMeal(user.id, req.body);

  res.status(201).json({
    success: true,
    message: "Meal created",
    data: result,
  });
};

export const getAllMeals = async (req: Request, res: Response) => {
  const result = await mealService.getAllMeals(req.query);

  res.status(200).json({
    success: true,
    data: result,
  });
};

export const getSingleMeal = async (
  req: Request<{ id: string }>,
  res: Response,
) => {
  const { id } = req.params;

  const result = await mealService.getSingleMeal(id);

  if (!result) {
    return res.status(404).json({
      success: false,
      message: "Meal not found",
    });
  }

  res.status(200).json({
    success: true,
    data: result,
  });
};

export const updateMeal = async (
  req: Request<{ id: string }>,
  res: Response,
) => {
  // declare that params.id is a string and also tell TS that the
  // authenticated user object has a string `id` property
  const user = (req as any).user as { id: string };
  const { id } = req.params; // typed as string

  const result = await mealService.updateMeal(id, user.id, req.body);

  res.status(200).json({
    success: true,
    message: "Meal updated",
    data: result,
  });
};

export const deleteMeal = async (
  req: Request<{ id: string }>,
  res: Response,
) => {
  const user = (req as any).user as { id: string };
  const { id } = req.params;

  await mealService.deleteMeal(id, user.id);

  res.status(200).json({
    success: true,
    message: "Meal deleted",
  });
};

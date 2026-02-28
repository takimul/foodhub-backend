import type { Request, Response } from "express";
import { cartService } from "./cart.service";

export const addToCart = async (req: Request, res: Response) => {
  const user = (req as any).user;
  const { mealId, quantity } = req.body;

  const result = await cartService.addToCart(user.id, mealId, quantity);

  res.status(200).json({
    success: true,
    data: result,
  });
};

export const getCart = async (req: Request, res: Response) => {
  const user = (req as any).user;

  const result = await cartService.getUserCart(user.id);

  res.status(200).json({
    success: true,
    data: result,
  });
};

export const updateCart = async (req: Request, res: Response) => {
  const user = (req as any).user;
  const { id } = req.params as { id: string };
  const { quantity } = req.body;

  const result = await cartService.updateCartItem(user.id, id, quantity);

  res.status(200).json({
    success: true,
    data: result,
  });
};

export const deleteCartItem = async (req: Request, res: Response) => {
  const user = (req as any).user;
  const { id } = req.params as { id: string };

  await cartService.removeCartItem(user.id, id);

  res.status(200).json({
    success: true,
    message: "Item removed",
  });
};

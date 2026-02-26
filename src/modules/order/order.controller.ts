import type { Request, Response } from "express";
import { orderService } from "./order.service";

export const createOrder = async (req: Request, res: Response) => {
  const user = (req as any).user;

  const result = await orderService.createOrder(user.id, req.body);

  res.status(201).json({
    success: true,
    message: "Order placed successfully",
    data: result,
  });
};

export const getMyOrders = async (req: Request, res: Response) => {
  const user = (req as any).user;

  const result = await orderService.getMyOrders(user.id);

  res.json({ success: true, data: result });
};

export const getSingleOrder = async (req: Request, res: Response) => {
  const user = (req as any).user;

  const result = await orderService.getSingleOrder(
    req.params.id as string,
    user.id,
  );

  res.json({ success: true, data: result });
};

export const getProviderOrders = async (req: Request, res: Response) => {
  const user = (req as any).user;

  const result = await orderService.getProviderOrders(user.id);

  res.json({ success: true, data: result });
};

export const updateOrderStatus = async (req: Request, res: Response) => {
  const { status } = req.body;

  const result = await orderService.updateOrderStatus(
    req.params.id as string,
    status,
  );

  res.json({ success: true, data: result });
};

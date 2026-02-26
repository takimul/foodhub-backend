import type { Request, Response } from "express";
import { orderService } from "./order.service";
import { asyncHandler } from "../../utils/asyncHandler";

export const createOrder = asyncHandler(async (req: Request, res: Response) => {
  const user = (req as any).user;

  const result = await orderService.createOrder(user.id, req.body);

  res.status(201).json({
    success: true,
    message: "Order placed successfully",
    data: result,
  });
});

export const getAllOrders = asyncHandler(
  async (req: Request, res: Response) => {
    const result = await orderService.getAllOrders();

    res.status(200).json({
      success: true,
      data: result,
    });
  },
);

export const getMyOrders = asyncHandler(async (req: Request, res: Response) => {
  const user = (req as any).user;

  const result = await orderService.getMyOrders(user.id);

  res.json({ success: true, data: result });
});

export const getSingleOrder = asyncHandler(
  async (req: Request, res: Response) => {
    const user = (req as any).user;

    const result = await orderService.getSingleOrder(
      req.params.id as string,
      user.id,
    );

    res.json({ success: true, data: result });
  },
);

export const getProviderOrders = asyncHandler(
  async (req: Request, res: Response) => {
    const user = (req as any).user;

    const result = await orderService.getProviderOrders(user.id);

    res.json({ success: true, data: result });
  },
);

export const updateOrderStatus = asyncHandler(
  async (req: Request, res: Response) => {
    const { status } = req.body;

    const result = await orderService.updateOrderStatus(
      req.params.id as string,
      status,
    );

    res.json({ success: true, data: result });
  },
);

//provider stats
export const getProviderStats = asyncHandler(
  async (req: Request, res: Response) => {
    const user = (req as any).user;

    const result = await orderService.getProviderStats(user.id);

    res.json({
      success: true,
      data: result,
    });
  },
);

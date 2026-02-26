import type { Request, Response } from "express";
import { userService } from "./user.service";
import { asyncHandler } from "../../utils/asyncHandler";

const getAllUsers = asyncHandler(async (req: Request, res: Response) => {
  const result = await userService.getAllUsers();
  res.json(result);
});

const getMyProfile = asyncHandler(async (req: Request, res: Response) => {
  const user = (req as any).user;
  const result = await userService.getSingleUser(user.id);
  res.json(result);
});

const updateUserStatus = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { isActive } = req.body;

  if (!id || typeof id !== "string") {
    res.status(400).json({ message: "Invalid user ID" });
    return;
  }

  const result = await userService.updateUserStatus(id, isActive);
  res.json(result);
});

const updateProfile = asyncHandler(async (req: Request, res: Response) => {
  const user = (req as any).user;

  const result = await userService.updateProfile(user.id, req.body);
  res.json(result);
});

export const userController = {
  getAllUsers,
  getMyProfile,
  updateUserStatus,
  updateProfile,
};

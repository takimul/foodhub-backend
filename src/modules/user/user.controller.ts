import type { Request, Response } from "express";
import { userService } from "./user.service";

const getAllUsers = async (req: Request, res: Response) => {
  const result = await userService.getAllUsers();
  res.json(result);
};

const getMyProfile = async (req: Request, res: Response) => {
  const user = (req as any).user;
  const result = await userService.getSingleUser(user.id);
  res.json(result);
};

const updateUserStatus = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { isActive } = req.body;

  if (!id || typeof id !== "string") {
    res.status(400).json({ message: "Invalid user ID" });
    return;
  }

  const result = await userService.updateUserStatus(id, isActive);
  res.json(result);
};

const updateProfile = async (req: Request, res: Response) => {
  const user = (req as any).user;

  const result = await userService.updateProfile(user.id, req.body);
  res.json(result);
};

export const userController = {
  getAllUsers,
  getMyProfile,
  updateUserStatus,
  updateProfile,
};

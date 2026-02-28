import type { Request, Response } from "express";
import { userService } from "./user.service";
import { asyncHandler } from "../../utils/asyncHandler";

export const getAllUsers = asyncHandler(async (req: Request, res: Response) => {
  const result = await userService.getAllUsers();

  res.status(200).json({
    success: true,
    data: result,
  });
});

const getMyProfile = asyncHandler(async (req: Request, res: Response) => {
  const user = (req as any).user;
  const result = await userService.getSingleUser(user.id);
  res.json(result);
});

export const updateUserStatus = asyncHandler(
  async (req: Request<{ id: string }>, res: Response) => {
    const { id } = req.params;
    const { isActive } = req.body;

    const result = await userService.updateUserStatus(id, isActive);

    res.status(200).json({
      success: true,
      message: "User status updated successfully",
      data: result,
    });
  },
);

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

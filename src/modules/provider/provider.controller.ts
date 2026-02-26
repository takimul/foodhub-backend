import type { Request, Response } from "express";
import { providerService } from "./provider.service";
import { asyncHandler } from "../../utils/asyncHandler";

export const getMyProfile = asyncHandler(
  async (req: Request, res: Response) => {
    const user = (req as any).user;

    const result = await providerService.getMyProviderProfile(user.id);

    res.json({
      success: true,
      data: result,
    });
  },
);

export const updateProfile = asyncHandler(
  async (req: Request, res: Response) => {
    const user = (req as any).user;

    const result = await providerService.updateProviderProfile(
      user.id,
      req.body,
    );

    res.json({
      success: true,
      message: "Profile updated",
      data: result,
    });
  },
);

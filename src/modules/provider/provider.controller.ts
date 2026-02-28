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

export const getPublicProvider = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const providerId = Array.isArray(id) ? id[0] : id;

    if (!providerId) {
      return res.status(400).json({
        success: false,
        message: "Provider id is required",
      });
    }

    const result = await providerService.getPublicProvider(providerId);

    if (!result) {
      return res.status(404).json({
        success: false,
        message: "Provider not found",
      });
    }

    res.status(200).json({
      success: true,
      data: result,
    });
  }
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

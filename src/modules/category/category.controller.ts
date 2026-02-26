import type { Request, Response } from "express";
import { categoryService } from "./category.service";
import { asyncHandler } from "../../utils/asyncHandler";

export const createCategory = asyncHandler(
  async (req: Request, res: Response) => {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({
        success: false,
        message: "Category name is required",
      });
    }

    const result = await categoryService.createCategory({ name });

    res.status(201).json({
      success: true,
      message: "Category created successfully",
      data: result,
    });
  },
);

export const getAllCategories = asyncHandler(
  async (req: Request, res: Response) => {
    const result = await categoryService.getAllCategories();

    res.status(200).json({
      success: true,
      data: result,
    });
  },
);

export const updateCategory = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const { name } = req.body;
    const categoryId = Array.isArray(id) ? id[0] : id;

    if (!categoryId) {
      return res.status(400).json({
        success: false,
        message: "Category id is required",
      });
    }

    const result = await categoryService.updateCategory(categoryId, name);

    res.status(200).json({
      success: true,
      message: "Category updated",
      data: result,
    });
  },
);

export const deleteCategory = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const categoryId = Array.isArray(id) ? id[0] : id;

    if (!categoryId) {
      return res.status(400).json({
        success: false,
        message: "Category id is required",
      });
    }

    await categoryService.deleteCategory(categoryId);

    res.status(200).json({
      success: true,
      message: "Category deleted",
    });
  },
);

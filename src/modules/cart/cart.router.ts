import { Router } from "express";
import {
  addToCart,
  getCart,
  updateCart,
  deleteCartItem,
} from "./cart.controller";
import { requireAuth } from "../../middlewares/auth";

const router = Router();

router.post("/", requireAuth, addToCart);
router.get("/", requireAuth, getCart);
router.patch("/:id", requireAuth, updateCart);
router.delete("/:id", requireAuth, deleteCartItem);

export const cartRouter = router;

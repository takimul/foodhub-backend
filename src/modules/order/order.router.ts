import { Router } from "express";
import {
  createOrder,
  getMyOrders,
  getSingleOrder,
  getProviderOrders,
  updateOrderStatus,
} from "./order.controller";
import { requireAuth, requireRole } from "../../middlewares/auth";

const router = Router();

// Customer
router.post("/", requireAuth, requireRole("CUSTOMER"), createOrder);
router.get("/", requireAuth, requireRole("CUSTOMER"), getMyOrders);
router.get("/:id", requireAuth, requireRole("CUSTOMER"), getSingleOrder);

// Provider
router.get(
  "/provider/orders",
  requireAuth,
  requireRole("PROVIDER"),
  getProviderOrders,
);

router.patch(
  "/provider/:id/status",
  requireAuth,
  requireRole("PROVIDER"),
  updateOrderStatus,
);

export const orderRouter = router;

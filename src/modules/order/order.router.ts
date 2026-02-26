import { Router } from "express";
import {
  createOrder,
  getMyOrders,
  getSingleOrder,
  getProviderOrders,
  updateOrderStatus,
  getAllOrders,
  getProviderStats,
} from "./order.controller";
import { requireAuth, requireRole } from "../../middlewares/auth";

const router = Router();

//admin
router.get("/admin/all", requireAuth, requireRole("ADMIN"), getAllOrders);

router.post("/", requireAuth, requireRole("CUSTOMER"), createOrder);
router.get("/", requireAuth, requireRole("CUSTOMER"), getMyOrders);
router.get("/:id", requireAuth, requireRole("CUSTOMER"), getSingleOrder);

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

router.get(
  "/provider/stats",
  requireAuth,
  requireRole("PROVIDER"),
  getProviderStats,
);

export const orderRouter = router;

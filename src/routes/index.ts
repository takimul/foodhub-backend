import { Router } from "express";
import { userRouter } from "../modules/user/user.router";
import { providerRouter } from "../modules/provider/provider.router";
import { authRouter } from "../modules/auth/auth.router";
import { categoryRouter } from "../modules/category/category.router";
import { mealRouter } from "../modules/meal/meal.router";
import { orderRouter } from "../modules/order/order.router";
import { reviewRouter } from "../modules/review/review.router";
import { cartRouter } from "../modules/cart/cart.router";

const router = Router();

router.use("/users", userRouter);
router.use("/admin/users", userRouter);
router.use("/providers", providerRouter);
router.use("/auth", authRouter);
router.use("/categories", categoryRouter);
router.use("/meals", mealRouter);
router.use("/orders", orderRouter);
router.use("/reviews", reviewRouter);
router.use("/cart", cartRouter);

export const apiRouter = router;

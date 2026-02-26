import { Router } from "express";
import { userRouter } from "../modules/user/user.router";
import { providerRouter } from "../modules/provider/provider.router";
import { authRouter } from "../modules/auth/auth.router";
import { categoryRouter } from "../modules/category/category.router";
import { mealRouter } from "../modules/meal/meal.router";

const router = Router();

router.use("/users", userRouter);
router.use("/providers", providerRouter);
router.use("/auth", authRouter);
router.use("/categories", categoryRouter);
router.use("/meals", mealRouter);

export const apiRouter = router;

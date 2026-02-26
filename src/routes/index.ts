import { Router } from "express";
import { userRouter } from "../modules/user/user.router";
import { providerRouter } from "../modules/provider/provider.router";
import { authRouter } from "../modules/auth/auth.router";

const router = Router();

router.use("/users", userRouter);
router.use("/providers", providerRouter);
router.use("/auth", authRouter);

export const apiRouter = router;

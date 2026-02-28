import { Router } from "express";
import { registerUser } from "./auth.controller";
import { registerSchema } from "./auth.validation";
import { validateRequest } from "../../middlewares/validateRequest";

const router = Router();

router.post("/register", validateRequest(registerSchema), registerUser);

export const authRouter = router;

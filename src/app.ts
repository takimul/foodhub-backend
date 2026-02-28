import express from "express";
import cors from "cors";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./lib/auth";
import { apiRouter } from "./routes";
import { globalErrorHandler } from "./middlewares/globalErrorHandler";

const app = express();

app.use(
  cors({
    origin: process.env.APP_URL || "http://localhost:3001",
    credentials: true,
  }),
);

app.use(express.json());

app.all("/api/auth/*splat", toNodeHandler(auth));
app.use("/api/v1", apiRouter);

app.get("/", (req, res) => {
  res.send("Welcome to FoodHub API");
});

app.use(globalErrorHandler);

export default app;

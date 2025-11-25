import express from "express";
import cookieParser from "cookie-parser";
import userRoutes from "./modules/user/routes/user.routes.js";
import { errorMiddleware } from "./core/errors/error.middleware.js";

const app = express();
app.use(express.json());
app.use(cookieParser());

// API routes
app.use("/api/users", userRoutes);

// health
app.get("/health", (req, res) => res.json({ ok: true }));

// error handler
app.use(errorMiddleware);

export default app;

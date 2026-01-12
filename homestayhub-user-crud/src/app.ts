import express from "express";
import cookieParser from "cookie-parser";
import authRoutes from "./modules/auth/routes/auth.routes.js";
import { errorMiddleware } from "./core/errors/error.middleware.js";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cookieParser());

// Add the required COOP and COEP headers middleware
app.use((req, res, next) => {
  
  res.setHeader('Cross-Origin-Opener-Policy', 'same-origin-allow-popups');
 
  res.setHeader('Cross-Origin-Embedder-Policy', 'require-corp');
  next();
});

app.use(cors({
  origin: 'http://localhost:3000', // allow your frontend origin
  credentials: true // if you use cookies or auth headers
}));

// API routes
app.use("/api/auth", authRoutes);

// health
app.get("/health", (req, res) => res.json({ ok: true }));

// error handler
app.use(errorMiddleware);

export default app;
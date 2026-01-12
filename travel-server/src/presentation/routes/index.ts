import { Router } from "express";
import userRoutes from "./user";
import adminRoutes from "./admin";
import hostRoutes from "./host";
import { StatusCode } from "@/types";

const router = Router();

router.get("/health", (req, res) => {
  res.status(StatusCode.Success).json({ message: "Server is running" });
});

router.use("/admin", adminRoutes);
router.use("/host", hostRoutes);
router.use("/user", userRoutes);

export default router;

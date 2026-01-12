// routes/admin/hostVerification.ts
import { Router } from "express";
import { resolve } from "@/di";
import { Controllers } from "@/di/controllers";
import HostVerificationController from "@/presentation/controllers/admin/HostVerificationController";
import AdminAuthMiddleware from "@/presentation/middlewares/AdminAuthMiddleware";

const router = Router();
const controller = resolve<HostVerificationController>(Controllers.HostVerificationController);


router.post("/approve", controller.approve.bind(controller));
router.post("/reject", controller.reject.bind(controller));
router.post("/reapply", controller.reapply.bind(controller));

export default router;
import { Router } from "express";
import { AuthController } from "../controllers/auth.controller.js";
import { validateBody } from "../../../core/middleware/validate.middleware.js";
import { createUserSchema } from "../validators/auth.validators.js";

const router = Router();
router.post("/register", validateBody(createUserSchema), AuthController.register);
router.post("/login", AuthController.login);
router.post("/refresh", AuthController.refresh);
router.post("/logout", AuthController.logout);

export default router;

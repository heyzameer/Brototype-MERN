import { Router } from "express";
import { Controllers } from "@/di/controllers";
import HostAuthControllers from "@/presentation/controllers/host/HostAuthControllers";
import container from "@/di";
import RateLimiterMiddleware from "@/presentation/middlewares/RateLimiterMiddleware";
import UserAuthMiddleware from "@/presentation/middlewares/UserAuthMiddleware";
import HostAuthMiddleware from "@/presentation/middlewares/HostAuthMiddleware";
import { MiddleWares } from "@/di/middlewares";

const hostAuthRouter = Router();

const hostAuthControllers = container.get<HostAuthControllers>(Controllers.HostAuthControllers);
const rateLimiter = new RateLimiterMiddleware(30);
const limiter = rateLimiter.exec.bind(rateLimiter);
const hostAuthMiddleware = container.get<HostAuthMiddleware>(MiddleWares.HostAuthMiddleware);

hostAuthRouter.post("/signup", limiter, hostAuthControllers.signup.bind(hostAuthControllers));
hostAuthRouter.post("/signin", limiter, hostAuthControllers.signin.bind(hostAuthControllers));
hostAuthRouter.post("/forgot-password", limiter, hostAuthControllers.forgotPassword.bind(hostAuthControllers));
hostAuthRouter.post("/reset-password", hostAuthControllers.resetPassword.bind(hostAuthControllers));
hostAuthRouter.post("/verify-otp", hostAuthControllers.verifyOtp.bind(hostAuthControllers));
hostAuthRouter.post("/resend-otp", limiter, hostAuthControllers.resendOtp.bind(hostAuthControllers));
hostAuthRouter.post("/refresh", limiter, hostAuthControllers.refreshAccessToken.bind(hostAuthControllers));
hostAuthRouter.post("/oauth-2", hostAuthControllers.oauthSignin.bind(hostAuthControllers));
hostAuthRouter.delete("/logout", hostAuthControllers.logout.bind(hostAuthControllers));
hostAuthRouter.get(
  "/profile",
  hostAuthMiddleware.exec,
  hostAuthControllers.getProfile.bind(hostAuthControllers)
);

export default hostAuthRouter;

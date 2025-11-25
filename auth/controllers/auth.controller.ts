import { Request, Response } from "express";
import { container } from "../../../core/di/container.js";
import { AuthService } from "../services/AuthService.js";
import { verifyRefreshToken } from "../../../core/utils/jwt.util.js";  // ✅ ADD THIS

const authService = container.get<AuthService>("AuthService");

export class AuthController {
  static async register(req: Request, res: Response) {
    const result = await authService.register(req.body);
    // set refresh token as httpOnly cookie
    res.cookie("refreshToken", result.refresh, { httpOnly: true, sameSite: "lax" });
    return res.status(201).json({ user: result.user, accessToken: result.access });
  }

  static async login(req: Request, res: Response) {
    const result = await authService.login(req.body.email, req.body.password);
    res.cookie("refreshToken", result.refresh, { httpOnly: true, sameSite: "lax" });
    return res.json({ user: result.user, accessToken: result.access });
  }

  static async refresh(req: Request, res: Response) {
    const refresh = req.cookies.refreshToken;
    const payload: any = verifyRefreshToken(refresh);
    const result = await authService.refresh(payload.sub, refresh);
    res.cookie("refreshToken", result.refresh, { httpOnly: true });
    return res.json({ accessToken: result.access });
  }

  static async logout(req: Request, res: Response) {
    const refresh = req.cookies.refreshToken;
    const payload: any = verifyRefreshToken(refresh);
    await authService.logout(payload.sub);
    res.clearCookie("refreshToken");
    res.json({ ok: true });
  }
}

import { Request, Response, NextFunction } from "express";
import { verifyAccessToken } from "../utils/jwt.util.js";
import { AuthRequest } from "../types/request.types.js";

/**
 * Require a valid JWT (Bearer token in Authorization header or cookie named 'token').
 * Sets req.user: { id, role, email? }
 */
export function requireAuth(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    // 1) Try Authorization header
    let token: string | undefined;
    const authHeader = (req.headers.authorization || "") as string;
    if (authHeader && authHeader.startsWith("Bearer ")) {
      token = authHeader.split(" ")[1];
    }

    // 2) Fallback to cookie (if you're using httpOnly cookie)
    if (!token && (req as any).cookies) {
      token = (req as any).cookies["token"];
    }

    if (!token) {
      return res.status(401).json({ error: "Unauthorized: token missing" });
    }

    const payload = verifyAccessToken(token);

    // decide primary role (take first role if multiple)
    const primaryRole = Array.isArray(payload.roles) && payload.roles.length > 0 ? payload.roles[0] : "user";

    req.user = {
      id: payload.sub,
      role: primaryRole,
      email: payload.email
    };

    next();
  } catch (err: any) {
    console.error("Auth middleware error:", err);
    return res.status(401).json({ error: "Invalid or expired token" });
  }
}

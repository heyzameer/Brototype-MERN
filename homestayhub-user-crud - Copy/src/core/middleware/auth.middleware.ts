import { Request, Response, NextFunction } from "express";
import { verifyAccessToken } from "../utils/jwt.util.js";
import { AuthRequest } from "../types/request.types.js";

export function requireAuth(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ error: "Unauthorized" });
    const token = authHeader.split(" ")[1] as string;
    const payload = verifyAccessToken(token) as any;
    req.user = { sub: payload.sub, roles: payload.roles };
    next();
  } catch (err) {
    return res.status(401).json({ error: "Invalid token" });
  }
}

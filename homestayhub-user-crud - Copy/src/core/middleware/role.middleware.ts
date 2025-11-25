import { NextFunction, Response } from "express";
import { AuthRequest } from "../types/request.types.js";

export function requireRole(allowed: string[]) {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user) return res.status(401).json({ error: "Unauthorized" });
    const has = req.user.roles.some(r => allowed.includes(r));
    if (!has) return res.status(403).json({ error: "Forbidden" });
    next();
  };
}

import jwt from "jsonwebtoken";
import { JwtPayload, Role } from "../types/jwt.types.js";

const JWT_SECRET = process.env.JWT_SECRET || 'default_secret'; 

export function signAccessToken(payload: { sub: string; roles: Role[]; email?: string }) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "7d" });
}

/**
 * Verify and return typed JwtPayload.
 * Will throw if invalid/expired.
 */
export function verifyAccessToken(token: string): JwtPayload {
  const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload | string;
  if (typeof decoded === "string") {
    // defensive: jwt.verify can return string for non-object payloads
    throw new Error("Invalid token payload");
  }
  // Ensure roles array exists
  decoded.roles = decoded.roles ?? ["user"];
  return decoded;
}

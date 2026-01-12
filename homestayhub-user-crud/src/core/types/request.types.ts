import { Request } from "express";
import { Role } from "./jwt.types.js";

export interface AuthUser {
  id: string;
  role: Role;
  email?: string;
}

export interface AuthRequest extends Request {
  user?: AuthUser;
}

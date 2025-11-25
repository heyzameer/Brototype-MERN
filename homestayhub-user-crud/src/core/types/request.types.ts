import { Request } from "express";
import { JwtPayload } from "./jwt.types.js";

export interface AuthRequest extends Request {
  user?: JwtPayload;
}

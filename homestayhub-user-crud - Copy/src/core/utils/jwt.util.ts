import jwt from "jsonwebtoken";
import {
  JWT_ACCESS_SECRET,
  JWT_REFRESH_SECRET,
  JWT_ACCESS_EXPIRES,
  JWT_REFRESH_EXPIRES,
} from "../config/env.js";

export const signAccessToken = (payload: object) =>
  jwt.sign(payload, JWT_ACCESS_SECRET, { expiresIn: JWT_ACCESS_EXPIRES });

export const signRefreshToken = (payload: object) =>
  jwt.sign(payload, JWT_REFRESH_SECRET, { expiresIn: JWT_REFRESH_EXPIRES });

export const verifyAccessToken = (token: string) =>
  jwt.verify(token, JWT_ACCESS_SECRET);

export const verifyRefreshToken = (token: string) =>
  jwt.verify(token, JWT_REFRESH_SECRET);

export type Role = "user" | "host" | "admin";

export interface JwtPayload {
  sub: string;         // user id
  roles: Role[];       // roles assigned
  email?: string;
  iat?: number;
  exp?: number;
}

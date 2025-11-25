export type Role = "user" | "host" | "admin";
export interface JwtPayload {
  sub: string; // userId
  roles: Role[];
}

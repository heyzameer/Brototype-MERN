import { NextFunction, Response } from "express";
import { CustomRequest, StatusCode, UserRole } from "@/types";
import ITokenService from "@/domain/interfaces/services/ITokenService";
import { inject, injectable } from "inversify";
import { Services } from "@/di/services";

@injectable()
export default class HostAuthMiddleware {
  constructor(@inject(Services.TokenService) private readonly tokenService: ITokenService) {
    this.exec = this.exec.bind(this);
  }

  exec(req: CustomRequest, res: Response, next: NextFunction) {
    try {
      const authHeader = req.headers.authorization;
      console.log(authHeader);
      if (!authHeader || !authHeader.startsWith("Bearer ")) {
        res.status(StatusCode.Forbidden).json({
          message: "Authentication failed: Missing or invalid Bearer token",
        });
        return;
      }

      const tokenString = authHeader.split(" ")[1];
      const { email, id, role } = this.tokenService.verifyAccessToken(tokenString);

      if (!id || !email || !role) {
        res.status(StatusCode.Unauthorized).json({
          message: "Authentication failed: Incomplete user data in token",
        });
        return;
      }

      if (role !== UserRole.Host) {
        res.status(StatusCode.Forbidden).json({
          message: "Access denied: Host role required",
        });
        return;
      }

      req.user = { email, id };
      next();
    } catch (error: any) {
      res.status(error.statusCode).json({ message: error.message });
    }
  }
}

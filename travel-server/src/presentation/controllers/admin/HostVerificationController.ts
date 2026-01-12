// src/presentation/controllers/admin/HostVerificationController.ts
import { Request, Response } from "express";
import { inject } from "inversify";
import { controller, httpPost } from "inversify-express-utils";
import { UseCases } from "@/di/useCases";
import VerifyHostUseCase from "@/use_case/host/VerifyHostUseCase";
import { StatusCode } from "@/types";
import { tryCatch } from "@/utils";

@controller("/api/admin/hosts")
export default class HostVerificationController {
  constructor(
    @inject(UseCases.VerifyHostUseCase)
    private verifyHostUseCase: VerifyHostUseCase
  ) {}

  // @httpPost("/approve")
  approve = tryCatch(async (req: Request, res: Response) => {
    const { hostId } = req.body;
    const result = await this.verifyHostUseCase.approve(hostId);
    res.status(StatusCode.Success).json(result);
  });

  // @httpPost("/reject")
  reject = tryCatch(async (req: Request, res: Response) => {
    const { hostId, reason } = req.body;
    const result = await this.verifyHostUseCase.reject(hostId, reason);
    res.status(StatusCode.Success).json(result);
  });

  // @httpPost("/reapply")
  reapply = tryCatch(async (req: Request, res: Response) => {
    const { hostId } = req.body;
    const result = await this.verifyHostUseCase.reapply(hostId);
    res.status(StatusCode.Success).json(result);
  });
}
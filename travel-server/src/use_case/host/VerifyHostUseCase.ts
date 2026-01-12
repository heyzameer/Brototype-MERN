// src/use_case/host/VerifyHostUseCase.ts
import { inject, injectable } from "inversify";
import IUserRepository from "@/domain/interfaces/repositories/IUserRepository";
import { TYPES } from "@/di/types";
import { VerificationStatus } from "../../types";

@injectable()
export default class VerifyHostUseCase {
  constructor(
    @inject(TYPES.IUserRepository) private userRepo: IUserRepository
  ) {}

  async approve(hostId: string) {
    const host = await this.userRepo.findById(hostId);
    if (!host || host.role !== "Host") throw new Error("Host not found");

    host.isVerified = true;
    host.verificationStatus = VerificationStatus.Approved;
    host.rejectionReason = null;
    await this.userRepo.update(hostId, host);

    return { success: true, message: "Host approved successfully" };
  }

  async reject(hostId: string, reason: string) {
    if (!reason?.trim()) throw new Error("Rejection reason is required");

    const host = await this.userRepo.findById(hostId);
    if (!host || host.role !== "Host") throw new Error("Host not found");

    host.isVerified = false;
    host.verificationStatus = VerificationStatus.Rejected;
    host.rejectionReason = reason.trim();
    await this.userRepo.update(hostId, host);

    return { success: true, message: "Host rejected" };
  }

  async reapply(hostId: string) {
    const host = await this.userRepo.findById(hostId);
    if (!host || host.role !== "Host") throw new Error("Host not found");

    host.verificationStatus = VerificationStatus.Pending;
    host.rejectionReason = null;
    await this.userRepo.update(hostId, host);

    return { success: true, message: "Reapply successful. Waiting for admin approval." };
  }
}

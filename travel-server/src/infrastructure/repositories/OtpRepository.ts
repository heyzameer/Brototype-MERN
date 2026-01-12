import IOtp from "@/domain/entities/IOtp";
import IOtpRepository from "@/domain/interfaces/repositories/IOtpRepository";
import OtpModel from "../models/Otp";

export default class OtpRepository implements IOtpRepository {
  model = OtpModel;

  async create(otp: number, email: string): Promise<void> {
    await this.model.create({ email, otp });
  }

  async findByEmailAndOtp(email: string, otp: number): Promise<IOtp | null> {
    return await this.model.findOne({ email, otp: +otp }).lean();
  }

  async findById(id: string): Promise<IOtp | null> {
    return await this.model.findById(id).lean();
  }

  async delete(id: string): Promise<void> {
    await this.model.findByIdAndDelete(id);
  }

  async deleteMany(email: string): Promise<void> {
    await this.model.deleteMany({ email });
  }
}

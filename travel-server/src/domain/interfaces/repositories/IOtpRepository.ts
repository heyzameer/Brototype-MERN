import IOtp from "@/domain/entities/IOtp";

export default interface IOtpRepository {
  create(otp: number, email: string): Promise<void>;
  findByEmailAndOtp(email: string, otp: number): Promise<IOtp | null>;
  findById(id: string): Promise<IOtp | null>;
  delete(id: string): Promise<void>;
  deleteMany(email: string): Promise<void>;
}

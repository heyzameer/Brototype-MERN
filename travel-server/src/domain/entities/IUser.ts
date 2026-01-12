import { DateString, UserRole, VerificationStatus } from "@/types";

export interface IUserProfile {
  readonly _id?: string;
  readonly name: string;
  readonly email: string;
  readonly profile?: string;
}

export default interface IUser extends IUserProfile {
  readonly isOAuthUser?: boolean;
  readonly isBlocked?: boolean;
  readonly password?: string;           // optional in queries
  readonly token?: string;

  readonly role: UserRole;
  readonly createdAt?: DateString;
  readonly updatedAt?: DateString;

  // Host Verification Fields
  verificationStatus?: VerificationStatus;
  isVerified?: boolean;
  rejectionReason?: string | null;
}

export type UserProfilePromise = Promise<IUserProfile | null>;
export type UserPromise = Promise<IUser | null>;
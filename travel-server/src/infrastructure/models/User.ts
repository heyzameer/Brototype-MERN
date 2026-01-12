import IUser from "@/domain/entities/IUser";
import { model, Schema } from "mongoose";
import { UserRole, VerificationStatus } from "@/types";

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String },
    token: { type: String },

    isBlocked: { type: Boolean, default: false },
    isOAuthUser: { type: Boolean, default: false },
    profile: { type: String },

    role: {
      type: String,
      enum: Object.values(UserRole),
      default: UserRole.User,
    },

    // Host Verification Fields
// models/User.ts
verificationStatus: {
  type: String,
  enum: Object.values(VerificationStatus),
  default: VerificationStatus.Pending,
},
isVerified: { type: Boolean, default: false },
rejectionReason: { type: String, default: null },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

const UserModel = model<IUser>("User", userSchema);
export default UserModel;
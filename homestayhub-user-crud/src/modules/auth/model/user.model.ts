import { Schema, model } from "mongoose";

export interface IUser {
  _id?: string;
  email: string;
  passwordHash?: string | undefined;
  fullName?: string | undefined;
  profileUrl?: string | undefined;
  roles?: string[] | undefined;
  googleId?: string | null | undefined;
  isHost?: boolean | undefined;
  isAdmin?: boolean | undefined;
  createdAt?: Date | undefined;
  updatedAt?: Date | undefined;
}


const UserSchema = new Schema<IUser>({
  email: { type: String, required: true, unique: true, index: true },
  passwordHash: { type: String },
  fullName: String,
  profileUrl: String,
  roles: { type: [String], default: ["user"] },
  googleId: { type: String, index: true, sparse: true },
  isHost: { type: Boolean, default: false },
  isAdmin: { type: Boolean, default: false }
}, { timestamps: true });

export const UserModel = model<IUser>("User", UserSchema);

import IUserRepository from "@/domain/interfaces/repositories/IUserRepository";
import UserModel from "../models/User";
import IUser, { UserProfilePromise, UserPromise } from "@/domain/entities/IUser";

export default class UserRepository implements IUserRepository {
  model = UserModel;
  credentials: string;

  constructor() {
    this.credentials = "-password -token -isOAuthUser -updatedAt -createdAt -isBlocked";
  }

  async findById(id: string): UserPromise {
    return await this.model.findById(id).lean();
  }

  async findAll(): Promise<IUser[]> {
    return await this.model.find().lean();
  }

  async findByEmail(email: string): UserPromise {
    return await this.model.findOne({ email }).lean();
  }

  async findByIdWithCredentials(id: string): UserPromise {
    return await this.model.findById(id).lean();
  }

  async findByEmailWithCredentials(email: string): UserPromise {
    return await this.model.findOne({ email }).lean();
  }

  async update(id: string, entity: IUser): UserPromise {
    return await this.model.findByIdAndUpdate(id, entity, { new: true }).lean();
  }

  async delete(id: string): Promise<void> {
    await this.model.deleteOne({ _id: id });
  }

  async create(payload: IUser): Promise<IUser> {
    return await this.model.create(payload);
  }
  async findByEmailForAuth(email: string): Promise<IUser | null> {
    return await this.model
      .findOne({ email })
      .select('+password') // crucial — because by default you probably have select: false on password
      .lean()
      .exec();
  }
}

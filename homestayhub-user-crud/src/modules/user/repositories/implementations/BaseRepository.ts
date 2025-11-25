import { Mode } from "fs";
import { Model } from "mongoose";

export abstract class BaseRepository<T> {
  protected model: Model<T>;

  constructor(model: Model<T>) {
    this.model = model;
  }
    async create(data: Partial<T>): Promise<T> {
    const doc = await this.model.create(data);
    return doc.toObject();
  } 
    async findById(id: string): Promise<T | null> {
    return this.model.findById(id).lean<T>().exec();
    }
   
    async delete(id: string): Promise<void> {
    await this.model.findByIdAndDelete(id).exec();
    }

    async update(id: string, data: Partial<T>): Promise<T | null> {
    return this.model.findByIdAndUpdate(id, data, { new: true }).lean<T>().exec();
    }

}



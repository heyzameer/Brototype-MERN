import { IListing } from "@/domain/entities/IListing";
import IListingRepository from "@/domain/interfaces/repositories/IListingRepository";
import ListingModel from "../models/Listing";
import { injectable } from "inversify";

@injectable()
export default class ListingRepository implements IListingRepository {
  async create(entity: IListing): Promise<IListing> {
    const newListing = await ListingModel.create(entity);
    return newListing.toObject();
  }

  async findById(id: string): Promise<IListing | null> {
    const listing = await ListingModel.findById(id).lean();
    return listing;
  }

  async update(id: string, entity: Partial<IListing>): Promise<IListing | null> {
    const updatedListing = await ListingModel.findByIdAndUpdate(id, entity, { new: true }).lean();
    return updatedListing;
  }

  async delete(id: string): Promise<void> {
    await ListingModel.findByIdAndDelete(id);
  }

  async findAll(): Promise<IListing[]> {
    const listings = await ListingModel.find().lean();
    return listings;
  }

  async findByHostId(hostId: string): Promise<IListing[]> {
    const listings = await ListingModel.find({ hostId }).lean();
    return listings;
  }
}

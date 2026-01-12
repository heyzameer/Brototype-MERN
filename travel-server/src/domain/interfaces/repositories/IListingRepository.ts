import { IListing } from "@/domain/entities/IListing";
import IBaseRepository from "./IBaseRepository";

export default interface IListingRepository extends IBaseRepository<IListing> {
  findByHostId(hostId: string): Promise<IListing[]>;
}

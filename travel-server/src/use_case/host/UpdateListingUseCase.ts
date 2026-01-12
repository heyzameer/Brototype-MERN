import { inject } from "inversify";
import { Repositories } from "@/di/repositories";
import IListingRepository from "@/domain/interfaces/repositories/IListingRepository";
import { NotFoundError, ForbiddenError } from "@/domain/entities/CustomErrors";
import { IListing } from "@/domain/entities/IListing";

interface Payload {
  listingId: string;
  userId: string;
  updates: Partial<IListing>;
}

export default class UpdateListingUseCase {
  constructor(
    @inject(Repositories.ListingRepository) private readonly listingRepository: IListingRepository,
  ) {}

  async exec({ listingId, userId, updates }: Payload) {
    const listing = await this.listingRepository.findById(listingId);

    if (!listing) {
      throw new NotFoundError("Listing not found");
    }

    // Ensure the user owns the listing
    if (listing.hostId.toString() !== userId) {
      throw new ForbiddenError("You are not authorized to update this listing");
    }

    const updatedListing = await this.listingRepository.update(listingId, updates);
    return updatedListing;
  }
}

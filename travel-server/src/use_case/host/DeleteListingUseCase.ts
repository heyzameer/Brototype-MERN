import { inject } from "inversify";
import { Repositories } from "@/di/repositories";
import IListingRepository from "@/domain/interfaces/repositories/IListingRepository";
import { NotFoundError, ForbiddenError } from "@/domain/entities/CustomErrors";

interface Payload {
  listingId: string;
  userId: string;
}

export default class DeleteListingUseCase {
  constructor(
    @inject(Repositories.ListingRepository) private readonly listingRepository: IListingRepository,
  ) {}

  async exec({ listingId, userId }: Payload) {
    const listing = await this.listingRepository.findById(listingId);

    if (!listing) {
      throw new NotFoundError("Listing not found");
    }

    // Ensure the user owns the listing
    if (listing.hostId.toString() !== userId) {
      throw new ForbiddenError("You are not authorized to delete this listing");
    }

    await this.listingRepository.delete(listingId);
    return { message: "Listing deleted successfully" };
  }
}

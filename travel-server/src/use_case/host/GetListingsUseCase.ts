import { inject } from "inversify";
import { Repositories } from "@/di/repositories";
import IListingRepository from "@/domain/interfaces/repositories/IListingRepository";

interface Payload {
  userId: string;
}

export default class GetListingsUseCase {
  constructor(
    @inject(Repositories.ListingRepository) private readonly listingRepository: IListingRepository,
  ) {}

  async exec({ userId }: Payload) {
    const listings = await this.listingRepository.findByHostId(userId);
    return listings;
  }
}

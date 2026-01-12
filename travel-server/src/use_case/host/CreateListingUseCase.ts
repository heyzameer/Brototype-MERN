import { inject } from "inversify";
import { Repositories } from "@/di/repositories";
import IUserRepository from "@/domain/interfaces/repositories/IUserRepository";
import IListingRepository from "@/domain/interfaces/repositories/IListingRepository";
import { NotFoundError, UnauthorizedError } from "@/domain/entities/CustomErrors";
import { UserRole } from "@/types";
import { Types } from "mongoose";

interface Payload {
  userId: string;
  title: string;
  description: string;
  price: number;
  location: string;
  images: string[];
  amenities: string[];
  guests: number;
  bedrooms: number;
  beds: number;
  bathrooms: number;
}

export default class CreateListingUseCase {
  constructor(
    @inject(Repositories.UserRepository) private readonly userRepository: IUserRepository,
    @inject(Repositories.ListingRepository) private readonly listingRepository: IListingRepository,
  ) {}

  async exec({
    userId,
    title,
    description,
    price,
    location,
    images,
    amenities,
    guests,
    bedrooms,
    beds,
    bathrooms,
  }: Payload) {
    const user = await this.userRepository.findByIdWithCredentials(userId);

    if (!user) {
      throw new UnauthorizedError("User not found.");
    }

    if (user.role !== UserRole.Host) {
      throw new UnauthorizedError("User is not authorized as a Host.");
    }

    if (!user._id) {
      throw new Error("User ID is missing.");
    }

    const newListing = await this.listingRepository.create({
      hostId: new Types.ObjectId(user._id),
      title,
      description,
      price,
      location,
      images,
      amenities,
      guests,
      bedrooms,
      beds,
      bathrooms,
      isAvailable: true,
    });

    return newListing;
  }
}

import { inject } from "inversify";
import { tryCatch } from "@/utils";
import { UseCases } from "@/di/useCases";
import CreateListingUseCase from "@/use_case/host/CreateListingUseCase";
import GetListingsUseCase from "@/use_case/host/GetListingsUseCase";
import UpdateListingUseCase from "@/use_case/host/UpdateListingUseCase";
import DeleteListingUseCase from "@/use_case/host/DeleteListingUseCase";
import { StatusCode } from "@/types";

export default class HostController {
  constructor(
    @inject(UseCases.CreateListingUseCase) private readonly createListingUseCase: CreateListingUseCase,
    @inject(UseCases.GetListingsUseCase) private readonly getListingsUseCase: GetListingsUseCase,
    @inject(UseCases.UpdateListingUseCase) private readonly updateListingUseCase: UpdateListingUseCase,
    @inject(UseCases.DeleteListingUseCase) private readonly deleteListingUseCase: DeleteListingUseCase,
  ) {}

  createListing = tryCatch(async (req, res) => {
    // Assuming userId is available from authentication middleware
    const userId = req.user!.id;
    const {
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
    } = req.body;

    const result = await this.createListingUseCase.exec({
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
    });

    res.status(StatusCode.Created).json(result);
  });

  getListings = tryCatch(async (req, res) => {
    const userId = req.user!.id;
    const listings = await this.getListingsUseCase.exec({ userId });
    res.status(StatusCode.Success).json(listings);
  });

  updateListing = tryCatch(async (req, res) => {
    const userId = req.user!.id;
    const { listingId } = req.params;
    const updates = req.body;

    const updatedListing = await this.updateListingUseCase.exec({ listingId, userId, updates });
    res.status(StatusCode.Success).json(updatedListing);
  });

  deleteListing = tryCatch(async (req, res) => {
    const userId = req.user!.id;
    const { listingId } = req.params;

    const result = await this.deleteListingUseCase.exec({ listingId, userId });
    res.status(StatusCode.Success).json(result);
  });
}

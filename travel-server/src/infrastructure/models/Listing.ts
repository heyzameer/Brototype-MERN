import { IListing } from "@/domain/entities/IListing";
import { model, Schema, Types } from "mongoose";

const listingSchema = new Schema<IListing>(
  {
    hostId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    location: { type: String, required: true },
    images: [{ type: String, required: true }],
    amenities: [{ type: String }],
    guests: { type: Number, required: true },
    bedrooms: { type: Number, required: true },
    beds: { type: Number, required: true },
    bathrooms: { type: Number, required: true },
    isAvailable: { type: Boolean, default: true },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

const ListingModel = model<IListing>("Listing", listingSchema);
export default ListingModel;

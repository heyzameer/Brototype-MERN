import { DateString } from "@/types";
import { Types } from "mongoose";

export interface IListing {
  _id?: string;
  hostId: Types.ObjectId;
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
  isAvailable: boolean;
  createdAt?: DateString;
  updatedAt?: DateString;
}

import { Router } from "express";
import { Controllers } from "@/di/controllers";
import { MiddleWares } from "@/di/middlewares";
import HostController from "@/presentation/controllers/host/HostController";
import UserAuthMiddleware from "@/presentation/middlewares/UserAuthMiddleware";
import container from "@/di";

const hostRouter = Router();

const hostController = container.get<HostController>(Controllers.HostController);
const userAuthMiddleware = container.get<UserAuthMiddleware>(MiddleWares.UserAuthMiddleware);

hostRouter.post(
  "/listings",
  userAuthMiddleware.exec,
  hostController.createListing
);
hostRouter.get(
  "/listings",
  userAuthMiddleware.exec,
  hostController.getListings
);
hostRouter.put(
  "/listings/:listingId",
  userAuthMiddleware.exec,
  hostController.updateListing
);
hostRouter.delete(
  "/listings/:listingId",
  userAuthMiddleware.exec,
  hostController.deleteListing
);

export default hostRouter;

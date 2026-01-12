import AuthControllers from "@/presentation/controllers/user/AuthControllers";
import container from ".";
import ProfileController from "@/presentation/controllers/user/ProfileController";
import AdminAuthController from "@/presentation/controllers/admin/AuthController";
import AdminController from "@/presentation/controllers/admin/AdminConroller";
import HostController from "@/presentation/controllers/host/HostController";
import UserAuthMiddleware from "@/presentation/middlewares/UserAuthMiddleware";
import HostAuthControllers from "@/presentation/controllers/host/HostAuthControllers";
import HostVerificationController from "@/presentation/controllers/admin/HostVerificationController";

export enum Controllers {
  AuthControllers = "AuthControllers",
  ProfileController = "ProfileController",
  AdminAuthController = "AdminAuthController",
  AdminController = "AdminController",
  HostController = "HostController",
  HostAuthControllers = "HostAuthControllers",
  HostVerificationController = "HostVerificationController"
}

container.bind(Controllers.AuthControllers).to(AuthControllers);
container.bind(Controllers.ProfileController).to(ProfileController);
container.bind(Controllers.AdminAuthController).to(AdminAuthController);
container.bind(Controllers.AdminController).to(AdminController);
container.bind(Controllers.HostController).to(HostController);
container.bind(Controllers.HostAuthControllers).to(HostAuthControllers);
container.bind(Controllers.HostVerificationController).to(HostVerificationController);


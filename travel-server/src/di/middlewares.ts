import UserAuthMiddleware from "@/presentation/middlewares/UserAuthMiddleware";
import container from ".";
import AdminAuthMiddleware from "@/presentation/middlewares/AdminAuthMiddleware";
import HostAuthMiddleware from "@/presentation/middlewares/HostAuthMiddleware";

export enum MiddleWares {
  UserAuthMiddleware = "UserAuthMiddleware",
  AdminAuthMiddleware = "AdminAuthMiddleware",
  HostAuthMiddleware = "HostAuthMiddleware",
}

container.bind(MiddleWares.UserAuthMiddleware).to(UserAuthMiddleware);
container.bind(MiddleWares.AdminAuthMiddleware).to(AdminAuthMiddleware);
container.bind(MiddleWares.HostAuthMiddleware).to(HostAuthMiddleware);

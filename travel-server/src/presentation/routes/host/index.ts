import { Router } from "express";
import hostRouter from "./hostRoutes";
import hostAuthRouter from "./hostAuthRoutes";

const hostRootRouter = Router();

hostRootRouter.use("/", hostRouter);
hostRootRouter.use("/auth", hostAuthRouter);
//sample route
hostRootRouter.get("/host/sample", (req, res) => {
  res.status(200).json({ message: "Hello World" });
});

export default hostRootRouter;

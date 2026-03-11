import { Router } from "express";
// import authRoutes from "./auth";
import itemRoutes from "./items";
import canvasRoutes from "./canvas";

const rootRouter: Router = Router();

// rootRouter.use("/auth", authRoutes);
rootRouter.use("/item", itemRoutes);
rootRouter.use("/canvas", canvasRoutes);

export default rootRouter;

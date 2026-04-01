import { Router } from "express";
// import authRoutes from "./auth";
import itemRoutes from "./items";
import canvasRoutes from "./canvas";
import r2Routes from "./r2";

const rootRouter: Router = Router();

// rootRouter.use("/auth", authRoutes);
rootRouter.use("/item", itemRoutes);
rootRouter.use("/canvas", canvasRoutes);
rootRouter.use("/r2", r2Routes);

export default rootRouter;

import { Router } from "express";
import {
  createCanvas,
  deleteCanvas,
  getCanvas,
  getCanvasByID,
  updateCanvas,
} from "../controllers/canvas";

const canvasRoutes: Router = Router();

canvasRoutes.route("/").get(getCanvas).post(createCanvas);
canvasRoutes
  .route("/:id")
  .get(getCanvasByID)
  .put(updateCanvas)
  .delete(deleteCanvas);

export default canvasRoutes;

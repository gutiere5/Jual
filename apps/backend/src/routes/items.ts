import { Router } from "express";
import {
  createItem,
  deleteItem,
  getItems,
  getItemsByID,
  updateItem,
} from "../controllers/items";

const itemRoutes: Router = Router();

itemRoutes.route("/").get(getItems).post(createItem);
itemRoutes.route("/:id").get(getItemsByID).put(updateItem).delete(deleteItem);

export default itemRoutes;

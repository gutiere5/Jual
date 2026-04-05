import { Router } from "express";
import { deleteObjectUrl, getListUrl, uploadUrl } from "../controllers/r2";

const r2Routes: Router = Router();

r2Routes.route("/").post(uploadUrl).get(getListUrl).delete(deleteObjectUrl);

export default r2Routes;

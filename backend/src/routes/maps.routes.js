import { Router } from "express";
import {getCoordinates} from "../controllers/map.controllers.js";
import { verifyJWTUser } from "../middlewares/authUser.middlewares.js";
import { verifyJWTCaptain } from "../middlewares/authCaptain.middleware.js";
const mapsRouter = Router();

mapsRouter.route("/get-coordinates").get(verifyJWTUser , getCoordinates);

export { mapsRouter };

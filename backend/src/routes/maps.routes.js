import { Router } from "express";
import {getCoordinates , getDistanceTime  , getAutoCompleteSuggestions}  from "../controllers/map.controllers.js";
import { verifyJWTUser } from "../middlewares/authUser.middlewares.js";
import { verifyJWTCaptain  } from "../middlewares/authCaptain.middleware.js";
const mapsRouter = Router();

mapsRouter.route("/get-coordinates").get(verifyJWTUser , getCoordinates);
mapsRouter.route("/get-distance-time").get(verifyJWTUser , getDistanceTime);
mapsRouter.route("/get-suggestions").get(verifyJWTUser  , getAutoCompleteSuggestions);
export { mapsRouter };

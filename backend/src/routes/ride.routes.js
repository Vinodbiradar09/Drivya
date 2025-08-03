import { Router } from "express";
import {verifyJWTUser} from "../middlewares/authUser.middlewares.js";
import {createRide , getFares} from "../controllers/ride.controllers.js";
const rideRouter = Router();
rideRouter.route("/createRide").post(verifyJWTUser , createRide);
rideRouter.route("/get-fare").get(verifyJWTUser , getFares);
export { rideRouter };
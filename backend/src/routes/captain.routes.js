import { Router } from "express";
import { registerCaptain,loginCaptain } from "../controllers/captain.controllers.js";
const captainRouter = Router();
captainRouter.route("/registerCaptain").post(registerCaptain);
captainRouter.route("/loginCaptain").post(loginCaptain);
export { captainRouter };
import { Router } from "express";
import { registerCaptain,loginCaptain,logoutCaptain, getCaptainProfile } from "../controllers/captain.controllers.js";
import { verifyJWTCaptain } from "../middlewares/authCaptain.middleware.js";
const captainRouter = Router();
captainRouter.route("/registerCaptain").post(registerCaptain);
captainRouter.route("/loginCaptain").post(loginCaptain);
captainRouter.route("/logoutCaptain").post(verifyJWTCaptain , logoutCaptain);
captainRouter.route("/captainProfile").get(verifyJWTCaptain , getCaptainProfile);
export { captainRouter };
import { Router } from "express";
import {registerUser,loginUser, logoutUser, getUserProfile} from "../controllers/user.controllers.js";
import { verifyJWTUser } from "../middlewares/auth.middlewares.js";
const userRouter = Router();
userRouter.route("/register").post(registerUser);
userRouter.route("/login").post(loginUser);
userRouter.route("/logout").post(verifyJWTUser , logoutUser);
userRouter.route("/currentUser").get(verifyJWTUser , getUserProfile);
export { userRouter };
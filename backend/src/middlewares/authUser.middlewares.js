import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.models.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const verifyJWTUser = asyncHandler(async (req, res, next) => {
    try {
        const token = req.cookies?.userAccessToken || req.header("Authorization")?.replace("Bearer ", "");
        if (!token) {
            throw new ApiError(401, "Unauthorized User's request");
        }
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        if (!decoded) {
            console.log("de" , decoded);
            throw new ApiError(404, "Failed to decode the tokens");
        }
        const user = await User.findById(decoded._id).select("-refreshTokens");
        if (!user) {
            console.log("d" , decoded);
            console.log("u" , user);
            throw new ApiError(404, "User not found while decoding the tokens");
        }
        req.user = user;
        next();
    } catch (error) {
        throw new ApiError(401, error.message || "Invalid Access Token")
    }
})

export{verifyJWTUser};
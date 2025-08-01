import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { Captain } from "../models/captain.models.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const verifyJWTCaptain = asyncHandler(async (req, res, next) => {
    try {
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");
        if (!token) {
            throw new ApiError(401, "Unauthorized User's request");
        }
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        if (!decoded) {
            throw new ApiError(404, "Failed to decode the tokens");
        }
        const captain = await Captain.findById(decoded._id).select("-refreshTokens");
        if(!captain){
            throw new ApiError(404, "captain not found while decoding the tokens");
        }
        req.captain = captain;
        next();
    } catch (error) {
        throw new ApiError(401, error.message || "Invalid Access Token")
    }
})

export { verifyJWTCaptain };
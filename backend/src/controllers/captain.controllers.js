import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Captain } from "../models/captain.models.js";
import { options } from "../utils/cookies.js";
import { validateEmail, validatePassword, validateIndianPhoneNumber } from "../utils/validators.js";
import { createCaptain } from "../services/captain.services.js";

const generateAccessAndRefreshTokens = async (captainId) => {
    try {
        if (!captainId) {
            throw new ApiError(400, "capatain Id not found");
        }
        const captain = await Captain.findById(captainId);
        if (!captain) {
            throw new ApiError(403, "Captain not found");
        }
        const accessToken = await captain.generateAccessToken();
        const refreshToken = await captain.generateRefreshToken();

        if (!accessToken || !refreshToken) {
            throw new ApiError(402, "failed to generate tokens");
        }
        captain.refreshTokens = refreshToken;
        await captain.save({ validateBeforeSave: false });

        return { accessToken, refreshToken };
    } catch (error) {
        throw new ApiError(500, "Something went wrong while generating the access token and refresh tokens ")
    }
}

const registerCaptain = asyncHandler(async (req, res) => {
    const { firstName, lastName, email, password, vehicle, phoneNumber } = req.body;
    if (
        [firstName, lastName, email, password, phoneNumber].some(field => typeof field !== "string" || field.trim() === "") ||
        typeof vehicle !== "object" || vehicle === null
    ) {
        throw new ApiError(400, "All fields including vehicle details are required to create a captain");
    }

    if (!validateEmail(email)) {
        throw new ApiError(401, "Invalid Email format");
    }
    if (!validatePassword(password)) {
        throw new ApiError(401, "Invalid password format");
    }
    if (!validateIndianPhoneNumber(phoneNumber)) {
        throw new ApiError(401, "Invalid Indian number format");
    }
    const existedCaptain = await Captain.findOne({ email });
    if (existedCaptain) {
        throw new ApiError(403, "the captain with email is already registerd , please try with new email")
    }
    const captain = await createCaptain({
        firstName,
        lastName,
        email,
        password,
        phoneNumber,
        color: vehicle.color,
        plate: vehicle.plate,
        capacity: vehicle.capacity,
        vehicleType: vehicle.vehicleType,
    })
    if (!captain) {
        throw new ApiError(409, "failed to register the captain");
    }
    const sanitizedCaptain = await Captain.findById(captain._id).select("-refreshTokens");
    if (!sanitizedCaptain) {
        throw new ApiError(404, "captain not found after registering");
    }
    res.status(200).json(new ApiResponse(200, sanitizedCaptain, "successfully captain created"));
})

const loginCaptain = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const missingFields = [];
    if (!email) missingFields.push("email")
    if (!password) missingFields.push("password");
    if (missingFields.length > 0) {
        throw new ApiError(400, "Email and Password fields are required");
    }
    if (!validateEmail(email)) {
        throw new ApiError(402, "Invalid email format");
    }
    if (!validatePassword(password)) {
        throw new ApiError(402, "Invalid Password format");
    }
    const captain = await Captain.findOne({ email }).select("+password");
    if (!captain) {
        throw new ApiError(404, "Captain not found , please enter accurate credentails");
    }
    const isValidPassword = await captain.isPasswordCorrect(password);
    if (!isValidPassword) {
        throw new ApiError(407, "Invalid password or email please check creds");
    }
    const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(captain._id);
    if (!accessToken || !refreshToken) {
        throw new ApiError(402, "failed to generate the tokens");
    }
    captain.status = "active";
    await captain.save({ validateBeforeSave: false });
    const loggedCaptain = await Captain.findById(captain._id).select("-refreshTokens");
    if (!loggedCaptain) {
        throw new ApiError(404, "captain not found while logging");
    }
    res.status(200)
        .cookie("captainAccessToken", accessToken, options)
        .cookie("captainRefreshToken", refreshToken, options)
        .json(new ApiResponse(200, {captain : loggedCaptain}, "captain loggedIn successfully"));
})

const logoutCaptain = asyncHandler(async (req, res) => {
    const captainId = req.captain?._id;
    if (!captainId) {
        throw new ApiError(400, "Captain Id not found");
    }
    const captain = await Captain.findByIdAndUpdate(captainId,
        {
            $unset: {
                refreshTokens: 1,
            }
        },
        {
            new: true,
            runValidators: true,
        }
    )
    if (!captain) {
        throw new ApiError(402, "failed to clear the refreshTokens from db");
    }
    res.status(200)
        .clearCookie("captainAccessToken", options)
        .clearCookie("captainRefreshToken", options)
        .json(new ApiResponse(200, {}, "Captain logged out successfully"));
})

const getCaptainProfile = asyncHandler(async(req , res)=>{
    const captain = req.captain;
    res.status(200).json(new ApiResponse(200 , captain , "captain profile fetched successfully"));
})
export { registerCaptain, loginCaptain , logoutCaptain , getCaptainProfile};
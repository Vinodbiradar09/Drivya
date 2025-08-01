import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { options } from "../utils/cookies.js";
import { validateEmail, validatePassword } from "../utils/validators.js";
import { User } from "../models/user.models.js";
import { createUser } from "../services/user.services.js";

const generateAccessAndRefreshTokens = async (userId) => {
    try {
        if (!userId) {
            throw new ApiError(402, "User ID not available");
        }
        const user = await User.findById(userId);
        if (!user) {
            throw new ApiError(402, "Failed to find the user");
        }
        const accessToken = await user.generateAccessToken();
        const refreshToken = await user.generateRefreshToken();

        if (!accessToken || !refreshToken) {
            throw new ApiError(404, "failed to generate the access and refreshTokens");
        }
        user.refreshTokens = refreshToken;
        await user.save({ validateBeforeSave: false });

        return { accessToken, refreshToken };
    } catch (error) {
        throw new ApiError(500, "Something went wrong while generating the access token and refresh tokens ")
    }
}

const registerUser = asyncHandler(async (req, res) => {
    const { firstName, lastName, email, password } = req.body;

    if ([firstName, lastName, email, password].some(field => field.trim() === "")) {
        throw new ApiError(401, "All the fields are required");
    }
    if (!validateEmail(email)) {
        throw new ApiError(402, "Invalid email format");
    }
    if (!validatePassword(password)) {
        throw new ApiError(402, "Invalid password format , password must contains atleast one uppercase and one integer and one special symbol")
    }
    const existedUser = await User.findOne({ email });
    if (existedUser) {
        throw new ApiError(403, "User with email already exists , please try with new email");
    }
    const user = await createUser({
        firstName, lastName, email, password
    })

    if (!user) {
        throw new ApiError(409, "Failed to create the user , please try again");
    }
    const sanitizedUser = await User.findById(user._id).select("-refreshTokens");
    if (!sanitizedUser) {
        throw new ApiError(404, "User not found");
    }
    res.status(200).json(new ApiResponse(200, sanitizedUser, "user created successfully"));
})

const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const missingFields = [];
    if (!email) missingFields.push("email");
    if (!password) missingFields.push("password");

    if (missingFields.length > 0) {
        throw new ApiError(400, `Missing required fields: ${missingFields.join(", ")}`);
    }
    if (!validateEmail(email)) {
        throw new ApiError(402, "Invalid email format");
    }
    if (!validatePassword(password)) {
        throw new ApiError(402, "Invalid password format must contain one upper case and one integer and one special symbol")
    }
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
        throw new ApiError(404, "User not found , invalid credentials");
    }
    const validPasword = await user.isPasswordCorrect(password);
    if (!validPasword) {
        throw new ApiError(404, "Invalid password or email please check creds");
    }
    const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(user._id);
    if (!accessToken && !refreshToken) {
        throw new ApiError(500, "Failed to generate authentication tokens.");
    }
    const loggedUser = await User.findById(user._id).select("-refreshTokens");
    if (!loggedUser) {
        throw new ApiError(404, "User not found");
    }
    res.status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(new ApiResponse(200, loggedUser, "User loggedIn successfully"));
})

const logoutUser = asyncHandler(async(req , res)=>{
    const userId = req.user?._id;
    if(!userId){
        throw new ApiError(403 , "Unauthorized access , please login");
    }
    const user = await User.findByIdAndUpdate(userId, 
        {
            $unset : {
                refreshTokens : 1,
            }
        },
        {
            new : true,
            runValidators : true,
        }
    )

    if(!user){
        throw new ApiError(402 , "failed to clear the refreshTokens from db");
    }

    res.status(200)
    .clearCookie("accessToken" , options)
    .clearCookie("refreshToken" , options)
    .json(new ApiResponse(200 , {} , "User logged out successfully"));
})

const getUserProfile = asyncHandler(async(req , res)=>{
    const user = await User.findById(req.user?._id).select("-refreshTokens");
    if(!user){
        throw new ApiError(404 , "User not found , please register");
    }
    res.status(200).json(new ApiResponse(200 , user , "successfully got the current user"));
})
export { registerUser, loginUser , logoutUser , getUserProfile};
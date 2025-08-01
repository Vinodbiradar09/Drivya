import { User } from "../models/user.models.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const createUser = async ({ firstName, lastName, email, password }) => {

    if([firstName , lastName , email , password].some(field => field.trim() === "")){
        throw new ApiError(402 , "All the fields are required to create user");
    }

    const user = await User.create({
        firstName,
        lastName,
        email,
        password
    })

    if(!user){
        throw new ApiError(409 , "Failed to create the user while registration");
    }

    return user;
}

export { createUser };
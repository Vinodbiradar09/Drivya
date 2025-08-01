import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Captain } from "../models/captain.models.js";

const createCaptain = async ({
    firstName,
    lastName,
    email,
    password,
    phoneNumber,
    color,
    plate,
    capacity,
    vehicleType
}) => {
    if ([firstName, lastName, email, password, phoneNumber, color, plate, capacity, vehicleType].some(field => field.trim() === "")) {
        throw new ApiError(402, "All the fields are required to create a captain")
    }

    const captain = await Captain.create({
        firstName,
        lastName,
        email,
        password,
        phoneNumber,
        vehicle : {
            color,
            plate,
            capacity,
            vehicleType
        }
    })

    if(!captain){
        throw new ApiError(408 , "failed to create a captain while registering");
    }

    return captain;
}

export { createCaptain };
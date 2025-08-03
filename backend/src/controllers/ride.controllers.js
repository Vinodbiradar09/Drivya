import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Ride } from "../models/ride.models.js";
import {
  getAddressCoordinate,
  getCaptainsInTheRadius,
} from "../services/maps.services.js";
import { sendMessageToSocketId } from "../socket.js";
import { createRideService , getFare } from "../services/ride.services.js";

const createRide = asyncHandler(async (req, res) => {
  const { pickup, destination, vehicleType } = req.body;
  const userId = req.user._id;

  const requiredFields = { pickup, destination, vehicleType };
  const missing = Object.entries(requiredFields).filter(
    ([, value]) => !value || value.trim() === ""
  );

  if (missing.length > 0) {
    const missingFieldNames = missing.map(([key]) => key).join(", ");
    throw new ApiError(
      401,
      `The following fields are required and cannot be empty: ${missingFieldNames}`
    );
  }

  const ride = await createRideService({
    user: userId,
    pickup,
    destination,
    vehicleType,
  });

  if (!ride) {
    throw new ApiError(409, "Failed to create the ride for the user");
  }
    res
    .status(200)
    .json(new ApiResponse(200,  ride , "Successfully created the ride"));

  const pickupCoordinates = await getAddressCoordinate(pickup);
  if (!pickupCoordinates) {
    throw new ApiError(409, "Failed to get the pickup coordinates");
  }

  const captainsInRadius = await getCaptainsInTheRadius(
    pickupCoordinates.ltd,
    pickupCoordinates.lng,
    2
  );

  //   if (!captainsInRadius || captainsInRadius.length === 0) {
  //     return res
  //       .status(200)
  //       .json(new ApiResponse(200, {}, 'No captains found in your radius'));
  //   }

  ride.otp = "";

  const rideWithUser = await Ride.findOne({ _id: ride._id }).populate("user");
  if (!rideWithUser) {
    throw new ApiError(404, "The ride with user details has not been found");
  }

  captainsInRadius.map((captain) => {
    sendMessageToSocketId(captain.socketId, {
      event: "new-ride",
      data: rideWithUser,
    });
  });

 
});

const getFares = asyncHandler(async(req , res)=>{
    const {pickup , destination}  = req.query;
    if(!pickup || !destination){
        throw new ApiError(409 , "pickup and destination is required to get the fare");
    }
    const fare = await getFare(pickup , destination);
    if(!fare){
        throw new ApiError(404 , "failed to generate the fair");
    }
    res.status(200).json(new ApiResponse(200 , fare , "successfully got the fare amount"));
})


export { createRide , getFares };

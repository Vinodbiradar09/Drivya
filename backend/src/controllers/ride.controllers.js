import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Ride } from "../models/ride.models.js";
import {
  getAddressCoordinate,
  getCaptainsInTheRadius,
} from "../services/maps.services.js";
import { sendMessageToSocketId } from "../socket.js";
import {
  createRideService,
  getFare,
  confirmRideService,
  startRideService,
  endRideService,
} from "../services/ride.services.js";
import mongoose from "mongoose";

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
    .json(new ApiResponse(200, ride, "Successfully created the ride"));

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

const getFares = asyncHandler(async (req, res) => {
  const { pickup, destination } = req.query;
  if (!pickup || !destination) {
    throw new ApiError(
      409,
      "pickup and destination is required to get the fare"
    );
  }
  const fare = await getFare(pickup, destination);
  if (!fare) {
    throw new ApiError(404, "failed to generate the fair");
  }
  res
    .status(200)
    .json(new ApiResponse(200, fare, "successfully got the fare amount"));
});

const confirmRide = asyncHandler(async (req, res) => {
  const { rideId } = req.body;
  if (!rideId || !mongoose.isValidObjectId(rideId)) {
    throw new ApiError(401, "Invalid rideId format");
  }
  const ride = await confirmRideService({ rideId, captain: req.captain });
  if (!ride) {
    throw new ApiError(404, "Failed to confirm the ride , please try again");
  }
  sendMessageToSocketId(ride.user.socketId, {
    event: "ride-confirmed",
    data: ride,
  });
  res
    .status(200)
    .json(new ApiResponse(200, ride, "successfully ride has been confirmed"));
});

const startRide = asyncHandler(async (req, res) => {
  const { rideId, otp } = req.query;
  if (!rideId || !otp) {
    console.log('ride' , rideId);
    console.log('otp' , otp);
    throw new ApiError(402, "ride id and otp is required to start ride");
  }
  const ride = await startRideService({ rideId, otp, captain: req.captain });
  if (!ride) {
    throw new ApiError(
      403,
      "Failed to start ride due to internal server issue"
    );
  }
  sendMessageToSocketId(ride.user.socketId, {
    event: "ride-started",
    data: ride,
  });
  res
    .status(200)
    .json(new ApiResponse(200, ride, "the ride has been successfully started"));
});

const endRide = asyncHandler(async (req, res) => {
  const { rideId } = req.body;
  if (!rideId) {
    throw new ApiError(403, "Invalid ride Id");
  }
  const ride = await endRideService({ rideId, captain: req.captain });
  if (!ride) {
    throw new ApiError(404, "failed to end the ride , due to internal issue");
  }
  sendMessageToSocketId(ride.user.socketId, {
    event: "ride-ended",
    data: ride,
  });
  res.status(200).json(new ApiResponse(200 , ride , "the ride has been successfully ended"));
});

export { createRide, getFares, confirmRide, startRide , endRide};

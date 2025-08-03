import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Ride } from "../models/ride.models.js";
import { Captain } from "../models/captain.models.js";
import crypto from "crypto";
import { getDistanceTimeFromService } from "../services/maps.services.js";

async function getFare(pickup, destination) {
  if (!pickup || !destination) {
    throw new ApiError(
      403,
      "pickup and destination is required to get the fare"
    );
  }
  const distanceTime = await getDistanceTimeFromService(pickup, destination);
  if (!distanceTime) {
    throw new ApiError(
      407,
      "while generating the fare amount distance time is failed to generate"
    );
  }
  const baseFare = {
    auto: 30,
    car: 50,
    moto: 20,
  };

  const perKmRate = {
    auto: 10,
    car: 15,
    moto: 8,
  };

  const perMinuteRate = {
    auto: 2,
    car: 3,
    moto: 1.5,
  };
  const fare = {
    auto: Math.round(
      baseFare.auto +
        (distanceTime.distance.value / 1000) * perKmRate.auto +
        (distanceTime.duration.value / 60) * perMinuteRate.auto
    ),
    car: Math.round(
      baseFare.car +
        (distanceTime.distance.value / 1000) * perKmRate.car +
        (distanceTime.duration.value / 60) * perMinuteRate.car
    ),
    moto: Math.round(
      baseFare.moto +
        (distanceTime.distance.value / 1000) * perKmRate.moto +
        (distanceTime.duration.value / 60) * perMinuteRate.moto
    ),
  };

  return fare;
}

function getOtp(num) {
  function generateOtp(num) {
    const otp = crypto
      .randomInt(Math.pow(10, num - 1), Math.pow(10, num))
      .toString();
    return otp;
  }
  return generateOtp(num);
}

const createRideService = async ({ user,pickup, destination, vehicleType,}) => {

  if(!user || !pickup || !destination || !vehicleType){
    throw new ApiError(403 , "All the fields are required");
  }

  const fare = await getFare(pickup, destination);
  if (!fare) {
    throw new ApiError(402, "fare is not generated while creating a ride");
  }
  const ride = await Ride.create({
    user,
    pickup,
    destination,
    otp: getOtp(6),
    fare: fare[vehicleType],
  });

  return ride;
};

export { createRideService , getFare };

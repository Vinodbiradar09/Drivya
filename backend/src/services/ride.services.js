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

const createRideService = async ({
  user,
  pickup,
  destination,
  vehicleType,
}) => {
  if (!user || !pickup || !destination || !vehicleType) {
    throw new ApiError(403, "All the fields are required");
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

const confirmRideService = async ({ rideId, captain }) => {
  if (!rideId || !captain) {
    throw new ApiError(
      400,
      "ride id is required and the captain must be authorized"
    );
  }
  await Ride.findByIdAndUpdate(
    rideId,
    {
      $set: {
        status: "accepted",
        captain: captain._id,
      },
    },
    {
      new: true,
      runValidators: true,
    }
  );

  const ride = await Ride.findOne({ _id: rideId })
    .populate("user")
    .populate("captain")
    .select("+otp");
  if (!ride) {
    throw new ApiError(404, "ride not found ");
  }

  return ride;
};

const startRideService = async ({ rideId, otp, captain }) => {
  if (!rideId || !otp) {
    console.log('rideIdS' , rideId)
    throw new ApiError(403, "ride id and otp is required to start ride");
  }
  const ride = await Ride.findOne({ _id: rideId , captain : captain._id })
    .populate("user")
    .populate("captain")
    .select("+otp");
  if (!ride) {
    throw new ApiError(404, "ride has not found");
  }
  if (ride.status !== "accepted") {
    throw new ApiError(407, "ride has not accepted");
  }
  if (ride.otp !== otp) {
    throw new ApiError(404, "Invalid otp");
  }
  await Ride.findByIdAndUpdate(
    rideId,
    {
      $set: {
        status: "ongoing",
      },
    },
    {
      new: true,
      runValidators: true,
    }
  );
  return ride;
};
const endRideService = async ({rideId , captain}) => {
    if(!rideId , !captain){
        throw new ApiError(403 , "ride id is required to end the ride");
    }
    const ride = await Ride.findOne({
        _id : rideId,
        captain : captain._id,
    }).populate('user').populate('captain').select('+otp');
    if(!ride){
        throw new ApiError(404 , "ride not found");
    }
    if(ride.status !== 'ongoing'){
        throw new ApiError(404 , "ride is not ongoing");
    }
    await Ride.findByIdAndUpdate(rideId , 
        {
            $set : {
                status : 'completed',
            }
        },
        {
            new : true,
            runValidators : true
        }
    )

    return ride;
};
export {
  createRideService,
  getFare,
  confirmRideService,
  startRideService,
  endRideService,
};

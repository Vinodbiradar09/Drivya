import { ApiError } from "../utils/ApiError.js";
import axios from "axios";
import { Captain } from "../models/captain.models.js";
import dotenv from "dotenv";
dotenv.config();

const getAddressCoordinate = async (address) => {
  if (!address) {
    throw new ApiError(402, "Address is required to get the co-ordinates");
  }
  const apiKey = process.env.GOOGLE_MAPS_API;
  if (!apiKey || apiKey === undefined) {
    throw new ApiError(408, "Api key required");
  }
  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
    address
  )}&key=${apiKey}`;
  try {
    const response = await axios.get(url);
    if (response.data.status === "OK") {
      // console.log("response" , response);
      const location = response.data.results[0].geometry.location;
      // console.log("location" , location);
      return {
        ltd: location.lat,
        lng: location.lng,
      };
    } else {
      throw new ApiError(404, "failed to fetch the co-ordinates");
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const getDistanceTimeFromService = async (origin, destination) => {
  if (!origin || !destination) {
    throw new ApiError(
      402,
      "Origin and destination are required to get the distance time"
    );
  }
  const apiKey = process.env.GOOGLE_MAPS_API;
  if (!apiKey || apiKey === undefined) {
    throw new ApiError(408, "Api key required");
  }
     const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${encodeURIComponent(origin)}&destinations=${encodeURIComponent(destination)}&key=${apiKey}`;

     try {
        const response = await axios.get(url);
        if(response.data.status === "OK"){
       
          if(response.data.rows[0].elements[0].status === "ZERO_RESULTS"){
            throw new ApiError(404 , "No Routes found");
          }
          return response.data.rows[0].elements[0];
        } else{
          throw new ApiError(402 , "Unable to fetch distance and time");
        }
     } catch (error) {
        console.error(error);
        throw error;
     }
};

const getAutoCompleteSuggestionsService = async(input)=>{
  if(!input){
    throw new ApiError(400 , "Input is required to get the auto complete suggestions")
  }
  const apiKey = process.env.GOOGLE_MAPS_API;
  if (!apiKey || apiKey === undefined) {
    throw new ApiError(408, "Api key required");
  }
  const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(input)}&key=${apiKey}`;
  try {
    const response = await axios.get(url);
    if(response.data.status === "OK"){
      return response.data.predictions.map(prediction => prediction.description).filter(value => value);
    } else {
      throw new ApiError(407 , "Unable to fetch the suggestions");
    }
  } catch (error) {
    console.error(error);
    throw  error;
  }
}

const getCaptainsInTheRadius = async(ltd , lng , radius) =>{
  const captains = await Captain.find({
    location : {
      $geoWithin: {
        $centerSphere:[[ltd , lng] , radius / 6371]
      }
    }
  });
  if(!captains){
    throw new ApiError(404 , "No captains found my boy");
  }
  return captains;
}

export { getAddressCoordinate, getDistanceTimeFromService , getAutoCompleteSuggestionsService , getCaptainsInTheRadius };

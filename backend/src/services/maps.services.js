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
  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`;
   try {
    const response = await axios.get(url);
    if(response.data.status ===  'OK'){
        // console.log("response" , response);
        const location = response.data.results[0].geometry.location;
        // console.log("location" , location);
        return {
            ltd : location.lat,
            lng : location.lng,
        }
    } else {
        throw new ApiError(404 , "failed to fetch the co-ordinates");
    }
   } catch (error) {
     console.error(error);
     throw error;
   }

};



export { getAddressCoordinate };

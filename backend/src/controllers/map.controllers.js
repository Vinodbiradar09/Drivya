import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { getAddressCoordinate } from "../services/maps.services.js";

const getCoordinates = asyncHandler(async (req, res) => {
  const { address } = req.query;
  if (!address || address === undefined || address === null) {
    throw new ApiError(402, "Address is required to get the cordinates");
  }
  const coordinates = await getAddressCoordinate(address);
  if(!coordinates){
    throw new ApiError(403 , "failed to generate the co-ordinates");
  }
  res.status(200).json(new ApiResponse(200 , coordinates , "successfully got the co-ordinates"));
});

export { getCoordinates };

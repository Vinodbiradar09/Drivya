import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { getAddressCoordinate , getDistanceTimeFromService , getAutoCompleteSuggestionsService} from "../services/maps.services.js";

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

const getDistanceTime = asyncHandler(async(req , res)=>{
    const {origin , destination} = req.query;
    const missingFields = ["origin" , "destination"].filter(field => !req.query[field]);
    if(missingFields.length > 0){
        throw new ApiError( 403,`Missing required query parameter(s): ${missingFields.join(', ')}` );
    }
    const distanceTime  = await getDistanceTimeFromService(origin , destination);
    if(!distanceTime){
        throw new ApiError(408 , "Distance time not found failed to generate it Due to internal server error");
    }
    res.status(200).json(new ApiResponse(200 , distanceTime , "successfully got the distance time from origin to destination"))
});

const getAutoCompleteSuggestions = asyncHandler(async(req , res)=>{
  const {input} = req.query;
  if(!input || input === undefined || input === null){
    throw new ApiError(401 , "Input is required to get the Auto complete suggestions");
  }
  const suggestions = await getAutoCompleteSuggestionsService(input);
  if(!suggestions){
    throw new ApiError(404 , "Suggestion not found due to internal server error");
  }
  res.status(200).json(new ApiResponse(200 , suggestions , "Successfully got the suggestions"));
});

export { getCoordinates , getDistanceTime , getAutoCompleteSuggestions};

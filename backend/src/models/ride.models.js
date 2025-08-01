import mongoose,{Schema , model} from "mongoose";


const rideSchema = new Schema(
    {

    },
    {
        timestamps : true
    }
)

const Ride = model("Ride" , rideSchema);

export{Ride};
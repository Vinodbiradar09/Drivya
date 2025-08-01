import mongoose,{Schema , model} from "mongoose";

const captainSchema = new Schema(
    {

    },
    {
        timestamps : true,
    }
)

const Captain = model("Captain" , captainSchema);

export {Captain};

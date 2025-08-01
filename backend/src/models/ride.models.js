import mongoose, { Schema, model } from "mongoose";


const rideSchema = new Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: [true, "user is required for a ride"],
        },
        captain: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Captain",
            required: true,
        },
        pickup: {
            type: String,
            required: true,
        },
        destination: {
            type: String,
            required: true,
        },
        fare: {
            type: Number,
            required: true,
        },
        status: {
            type: String,
            enum: ['pending', 'accepted', 'ongoing', 'completed', 'cancelled'],
            default: 'pending',
        },
        duration: {
            type: Number,
        }, // in seconds

        distance: {
            type: Number,
        }, // in meters

        paymentID: {
            type: String,
        },
        orderId: {
            type: String,
        },
        signature: {
            type: String,
        },
        otp: {
            type: String,
            select: false,
            required: true,
        }

    },
    {
        timestamps: true
    }
);

const Ride = model("Ride", rideSchema);

export { Ride };
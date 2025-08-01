import mongoose, { Schema, model } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const captainSchema = new Schema(
    {
        fullName: {
            type: String,
            maxlength: [20, "Full Name can't exceed more than 20 chars"],
            required: true,
            trim: true,
            lowercase: true,
        },
        lastName: {
            type: String,
            required: true,
            trim: true,
            lowercase: true,
            maxlength: [20, "Last name can't exceed more than 20 chars"],
        },
        email: {
            type: String,
            required: [true, "Email is required"],
            unique: true,
            index: true,
            lowercase: true,
            trim: true,
            match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email'],
        },
        password: {
            type: String,
            required: [true, "Password is required"],
            minlength: [8, 'Password Must be 8 chars longs and must contain one uppercase and one integer and one special symbol'],
            select: false,
        },
        socketId: {
            type: String,
        },
        status: {
            type: String,
            enum: ["active", "inactive"],
            default: 'inactive',
        },
        vehicle: {
            color: {
                type: String,
                required: [true, "Color of the vehicle is required"],
                minlength: [3, 'Color must be at least 3 characters long'],
            },
            plate: {
                type: String,
                required: [true, "Plate is required"],
                minlength: [3, 'Plate must be at least 3 characters long'],
            },
            capacity: {
                type: Number,
                required: true,
                min: [1, 'Capacity must be at least 1'],
            },
            vehicleType: {
                type: String,
                required: true,
                enum: ["car", "motorcycle", "auto"],
            },
        },
        location: {
            ltd: {
                type: Number,
            },
            lng: {
                type: Number,
            }
        },
         refreshTokens: {
            type: String,
        },
    },
    {
        timestamps: true,
    }
)

captainSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
})

captainSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password , this.password);
}
captainSchema.methods.generateAccessToken = async function () {
    return jwt.sign(
        {
            _id : this._id,
            email : this.email,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn : process.env.ACCESS_TOKEN_EXPIRY,
        }
    )
}
captainSchema.methods.generateRefreshToken = async function (){
    return jwt.sign(
        {
            _id : this._id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn : process.env.REFRESH_TOKEN_EXPIRY,
        }
    )
}

const Captain = model("Captain", captainSchema);

export { Captain };

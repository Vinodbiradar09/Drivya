import mongoose, { Schema, model } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const userSchema = new Schema(
    {
        firstName: {
            type: String,
            required: true,
            trim: true,
            maxlength: [50, "Full name can't exceed more than 50 chars"],
            lowercase: true,
        },
        lastName: {
            type: String,
            required: true,
            trim: true,
            maxlength: [50, "Last Name can't exceed more than 50 chars"],
            lowercase: true

        },
        email: {
            type: String,
            required: [true, "Email is required"],
            match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email'],
            index: true,
            lowercase: true,
            unique: true,
            trim: true,
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
        refreshTokens: {
            type: String,
        },

    },
    {
        timestamps: true
    }
)

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password)
}

userSchema.methods.generateAccessToken = async function () {
    return jwt.sign(
        {
            _id: this._id,
            email: this.email
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn : process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}

userSchema.methods.generateRefreshToken = async function () {
    return jwt.sign(
        {
            _id : this._id
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn : process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}

const User = model("User", userSchema);

export { User };


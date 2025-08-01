import mongoose, { Schema, model } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const userSchema = new Schema(
    {

    },
    {
        timestamps: true
    }
)

const User = model("User" , userSchema);

export {User};


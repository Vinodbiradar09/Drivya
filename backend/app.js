import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
const app = express();

app.use(cors(
    {
        origin: process.env.CORS_ORIGIN, // here we are defining the origin which is frontend's url's 
        credentials: true,
    }
))

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use(cookieParser());

import { userRouter } from "./src/routes/user.routes.js";
import { rideRouter } from "./src/routes/ride.routes.js";
import { mapsRouter } from "./src/routes/maps.routes.js";
import { captainRouter } from "./src/routes/captain.routes.js";

app.use("/api/v1/user" , userRouter);
app.use("/api/v1/ride" , rideRouter);
app.use("/api/v1/maps" , mapsRouter);
app.use("/api/v1/captain" , captainRouter);

export { app };
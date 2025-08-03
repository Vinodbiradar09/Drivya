import http from "http";
import { app } from "./app.js";
import { connectDB } from "./src/db/db.js";
import { initializeSocket } from "./socket.js";


const server = http.createServer(app);


connectDB()
    .then(() => {
        server.listen(process.env.PORT || 4000, () => {
            console.log(`server is running at local host ${process.env.PORT}`);
        })
    })
    .catch((err) => {
        console.log("Connection failed for database", err);
    })


    // make sure to restrict the key by visiting the credentails page make sure to restrict websites and ip addresses
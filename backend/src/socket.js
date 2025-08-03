import { Socket } from "socket.io";
import { User } from "./models/user.models.js";
import { Captain } from "./models/captain.models.js";

let io;
const initializeSocket = (server) => {
  io = Socket(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });
  io.on("connection", (socket) => {
    console.log(`Client connected: ${socket.id}`);
    socket.on("join", async (data) => {
      const { userId, userType } = data;
      if (userType === "user") {
        await User.findByIdAndUpdate(userId, {
          socketId: socket.id,
        });
      } else if (userType === "captain") {
        await Captain.findByIdAndUpdate(userId, {
          socketId: socket.id,
        });
      }
    });
    socket.on("update-location-captain", async (data) => {
      const { userId, location } = data;
      if (!location || !location.ltd || !location.lng) {
        return socket.emit("error", { message: "Invalid location data" });
      }
      await Captain.findByIdAndUpdate(userId, {
        location: {
          ltd: location.ltd,
          lng: location.lng,
        },
      });
    });

    socket.on("disconnect", () => {
      console.log(`Client disconnected: ${socket.id}`);
    });
  });

};


const sendMessageToSocketId = (socketId, messageObject) => {
    console.log(messageObject);
    if(io){
        io.to(socketId).emit(messageObject.event , messageObject.data)
    } else {
        console.log('Socket.io not initialized.');
    }
};
export { initializeSocket, sendMessageToSocketId };

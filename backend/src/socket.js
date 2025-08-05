
import { Server } from "socket.io"; 
import { User } from "./models/user.models.js";
import { Captain } from "./models/captain.models.js";

let io;

const initializeSocket = (server) => {

  io = new Server(server, {
    cors: {
      origin: "http://localhost:5173", // Match your frontend URL
      methods: ["GET", "POST"],
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    console.log(`Client connected: ${socket.id}`);

    socket.on("join", async (data) => {
      const { userId, userType } = data;
      
      try {
        if (userType === "user") {
          await User.findByIdAndUpdate(userId, {
            socketId: socket.id,
          });
          console.log(`User ${userId} joined with socket ${socket.id}`);
        } else if (userType === "captain") {
          await Captain.findByIdAndUpdate(userId, {
            socketId: socket.id,
          });
          console.log(`Captain ${userId} joined with socket ${socket.id}`);
        }
      } catch (error) {
        console.error("Error updating socket ID:", error);
        socket.emit("error", { message: "Failed to join" });
      }
    });

    socket.on("update-location-captain", async (data) => {
      const { userId, location } = data;
      
      if (!location || !location.ltd || !location.lng) {
        return socket.emit("error", { message: "Invalid location data" });
      }

      try {
        await Captain.findByIdAndUpdate(userId, {
          location: {
            ltd: location.ltd,
            lng: location.lng,
          },
        });
        console.log(`Updated location for captain ${userId}`);
      } catch (error) {
        console.error("Error updating captain location:", error);
        socket.emit("error", { message: "Failed to update location" });
      }
    });

    socket.on("disconnect", () => {
      console.log(`Client disconnected: ${socket.id}`);
    });
  });

  return io;
};

const sendMessageToSocketId = (socketId, messageObject) => {
  console.log("Sending message:", messageObject);
  if (io) {
    io.to(socketId).emit(messageObject.event, messageObject.data);
  } else {
    console.log("Socket.io not initialized.");
  }
};

const getIO = () => {
  if (!io) {
    throw new Error("Socket.io not initialized!");
  }
  return io;
};

export { initializeSocket, sendMessageToSocketId, getIO };
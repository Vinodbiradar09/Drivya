
import http from "http";
import { app } from "./app.js";
import { connectDB } from "./src/db/db.js";
import { initializeSocket } from "./src/socket.js"; 

const server = http.createServer(app);

connectDB()
    .then(() => {
      
        initializeSocket(server);
        console.log("Socket.IO initialized successfully");
        
        const PORT = process.env.PORT || 4005; // Use 4005 to match your frontend
        
        server.listen(PORT, () => {
            console.log(`Server is running at http://localhost:${PORT}`);
            console.log(`Socket.IO server is ready at http://localhost:${PORT}`);
        });
    })
    .catch((err) => {
        console.log("Connection failed for database", err);
    });


process.on('SIGTERM', () => {
    console.log('SIGTERM received, shutting down gracefully');
    server.close(() => {
        console.log('Process terminated');
    });
});

process.on('SIGINT', () => {
    console.log('SIGINT received, shutting down gracefully');
    server.close(() => {
        console.log('Process terminated');
    });
});

    // make sure to restrict the key by visiting the credentails page make sure to restrict websites and ip addresses
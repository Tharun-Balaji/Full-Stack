import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();
const server = http.createServer(app);

// Initialize a new instance of socket.io by passing the server object
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000", // Allow requests from this origin
        methods: ["GET", "POST"], // Allow these HTTP methods
    },
});

// Map to store user IDs and their corresponding socket IDs
const userSocketMap = {};

// Function to get socket ID of a specific receiver by their user ID
export function getReceiverSocketId(receiverId) {
    return userSocketMap[receiverId];
}

// Event listener for new socket connections
io.on("connection", (socket) => {
    console.log("a user connected", socket.id);

    const userId = socket.handshake.query.userId;
    if (userId !== "undefined") {
        userSocketMap[userId] = socket.id;
    }

    // Emit the list of online users to all connected clients
    io.emit("getOnlineUsers", Object.keys(userSocketMap));

    // Listen for the 'disconnect' event to handle user disconnection
    socket.on("disconnect", () => {
        console.log("user disconnected", socket.id);
        delete userSocketMap[userId];
        io.emit("getOnlineUsers", Object.keys(userSocketMap));
    });
});

// Export the app, io, and server instances for use in other modules
export { app, io, server };


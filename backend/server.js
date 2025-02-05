const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*", // Change this to your frontend URL in production
        methods: ["GET", "POST"]
    }
});

io.on("connection", (socket) => {
    console.log("A client connected:", socket.id);

    socket.on("gpsData", (data) => {
        console.log("Received GPS Data:", data);
        
        // Broadcast to all clients
        io.emit("gpsUpdate", data);
    });

    socket.on("disconnect", () => {
        console.log("Client disconnected:", socket.id);
    });
});

server.listen(4001, () => console.log("Socket.io server running on port 4001"));

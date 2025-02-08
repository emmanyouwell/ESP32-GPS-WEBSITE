const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

app.use(express.json());
app.use(cors());

let latestLocation = { latitude: 0, longitude: 0 };

// Receive location from ESP32
app.post("/location", (req, res) => {
  const { latitude, longitude } = req.body;
  
  if (latitude && longitude) {
    latestLocation = { latitude, longitude };
    console.log("Updated Location:", latestLocation);
    
    // Emit location to connected frontend clients
    io.emit("locationUpdate", latestLocation);

    res.json({ success: true, message: "Location updated" });
  } else {
    res.status(400).json({ success: false, message: "Invalid data" });
  }
});

// Handle WebSocket connection
io.on("connection", (socket) => {
  console.log("Client connected:", socket.id);
  
  // Send latest location when a new client connects
  socket.emit("locationUpdate", latestLocation);
  
  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

const PORT = process.env.PORT || 4001;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
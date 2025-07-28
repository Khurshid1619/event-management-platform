require("dotenv").config();
const express = require("express");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");
const connectDB = require("./config/db");
const authRoutes = require("./routes/auth");
const eventRoutes = require("./routes/events");
const statsRoutes = require("./routes/stats");

const app = express();
const server = http.createServer(app);

app.use(cors({ origin: "*" }));
app.use(express.json());

// ✅ MongoDB Connection Start
console.log("⏳ Connecting to MongoDB...");
connectDB();

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/stats", statsRoutes);

// Initialize WebSocket Server
const io = new Server(server, {
  cors: { origin: "*" },
});

io.on("connection", (socket) => {
  console.log("⚡ New client connected:", socket.id);

  socket.on("updateAttendees", (eventId) => {
    io.emit("attendeesUpdated", eventId);
  });

  socket.on("eventUpdated", (eventId) => {
    io.emit("eventUpdated", eventId);
  });

  socket.on("disconnect", () => {
    console.log("❌ Client disconnected");
  });
});

// Start Server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log("✅ Server is up and running!");
});

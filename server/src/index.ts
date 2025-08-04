// index.ts
import http from "http";
import { Server } from "socket.io";
import { AppDataSource } from "./config/data-source";
import app from "./app"; // import the Express app
import { NotificationService } from "./services/notification.service";
import { env } from "./utils/env";

const API_BASE_URL = env.API_BASE_URL;
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: API_BASE_URL,
    methods: ["GET", "POST"]
  }
});

// io.on("connection", (socket) => {
//   console.log("User connected:", socket.id);
//   socket.on("send_message", (data) => {
//     console.log("Message received:", data);
//     io.emit("receive_message", data);
//   });
// });
// Remove this line:
// const userSocketMap = new Map<string, string>(); // userId -> socketId

NotificationService.initialize(io);
io.on("connection", (socket) => {
  const userId = socket.handshake.auth.userId;

  if (userId) {
    // Use NotificationService's socket map instead of local one
    NotificationService.registerUserSocket(userId, socket.id);
    console.log(`User ${userId} connected with socket ${socket.id}`);
    
    // Emit welcome notification when user connects/refreshes
    NotificationService.emitToUser(userId, {
      type: "welcome",
      message: "Welcome back! You're now connected.",
      data: { timestamp: new Date().toISOString() }
    });
  }

  socket.on("notification", (data) => {
    console.log("Notification received:", data);
  });

  socket.on("disconnect", () => {
    if (userId) {
      // Remove from NotificationService's map
      NotificationService.removeUserSocket(userId);
    }
  });
});


AppDataSource.initialize()
  .then(() => {
    const PORT = parseInt(process.env.PORT || '3000', 10);
    server.listen(PORT, '0.0.0.0', () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Database connection failed:", err);
  });

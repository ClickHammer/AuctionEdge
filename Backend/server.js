import app from "./app.js";
import http from "http";
import { Server } from "socket.io"; // Import the socket.io server

const server = http.createServer(app); // Use the existing app instance with http server
const io = new Server(server, {
  cors: {
    origin: "*", // Replace this with your frontend URL for production (e.g., "")
  }
});

io.on("connection", (socket) => {
  console.log("A user connected");
  console.log(socket.id);
  socket.emit("welcome",`welcome to the server ${socket.id} `);
  socket.on("newBid",(bidData)=>{
    socket.broadcast.emit('refresh', bidData);
  })
  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
  
  // Optional: Listen for events from the client
});

// Existing Cloudinary config
import cloudinary from "cloudinary";
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

server.listen(process.env.PORT, () => {
  console.log(`Server listening on port http://localhost:4000`);
});

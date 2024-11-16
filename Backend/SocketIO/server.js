import { Server } from 'socket.io';
import http from 'http';
import express from 'express';

const app = express();

const server = http.createServer(app); // Create an HTTP server
const io = new Server(server, { // Correctly instantiate the Server with `new`
  cors: {
    origin: "http://localhost:3001", // Allow requests from this origin
    methods: ["GET", "POST"]
  }
});

export const getReceiverSocketId=(receiverId)=>{
  return users[receiverId]
}

const users = {}

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);
  const userId = socket.handshake.query.userId
  if (userId) {
    users[userId] = socket.id
    console.log("Users connected:", users)
  }
  io.emit("getOnlineUser", Object.keys(users))

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
    delete users[userId];
    io.emit("getOnlineUser", Object.keys(users));
  });
});

export { app, io, server };

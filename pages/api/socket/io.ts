import { Server as NextServer } from "http";
import { NextApiRequest } from "next";
import { Server as ServerIO } from "socket.io";
import { NextApiResponseServerIo } from "../../../types";
export const config = {
  api: {
    bodyparser: false,
  },
};
const ioHandler = (req: NextApiRequest, res: NextApiResponseServerIo) => {
  if (!res.socket.server.io) {
    const path = "/api/socket/io";
    const httpServer: NextServer = res.socket.server as any;
    const io = new ServerIO(httpServer, {
      path: path,
      addTrailingSlash: false,
    });
    io.on("connection", (socket) => {
      console.log("User connected:", socket.id);

      socket.on("event:message", ({ message, room }) => {
        console.log("Received chat message:", message);
        socket.to(room).emit("event:message", message);
      });
      socket.on("join-room", (room) => {
        console.log(`${socket.id} joined room: ${room}`);
        socket.join(room);
        socket.emit("room-joined"); // Join the room
      });

      // Handle code updates in a room
      socket.on("update-code", ({ code, room }) => {
        console.log(`Code update in room ${room}:`, code);

        // Broadcast the updated code to other users in the same room
        socket.to(room).emit("code-updated", code);
      });

      socket.on("disconnect", () => { 
        console.log("User disconnected:", socket.id);
      });
    });
    res.socket.server.io = io;
  }

  res.end();
};

export default ioHandler;

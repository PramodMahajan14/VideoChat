const express = require("express");
const bodyparser = require("body-parser");
const { Server } = require("socket.io");

const io = new Server({
  cors: true,
});
const app = express();

app.use(bodyparser.json());

const emailToSocketMapping = new Map();
const socketToEmailMapping = new Map();

io.on("connection", (socket) => {
  console.log("new conection");
  socket.on("join-room", (data) => {
    const { roomId, email } = data;

    console.log("User : ", email, " Joined Room : ", roomId);
    emailToSocketMapping.set(email, socket.id);
    socketToEmailMapping.set(socket.id, email);
    socket.join(roomId);
    socket.emit("joined-room", { roomId });
    socket.broadcast.to(roomId).emit("user-joined", { email });
  });

  socket.on("call-user", (data) => {
    const { email, offer } = data;
    const fromEmail = socketToEmailMapping.get(socket.id);
    const socketId = emailToSocketMapping.get(email);
    socket.to(socketId).emit("incomming-call", { from: fromEmail, offer });
  });

  socket.on("call-accepted", (data) => {
    const { email, ans } = data;

    const socketId = emailToSocketMapping.get(email);

    socket.to(socketId).emit("call-accepted", { ans });
  });
});

app.listen(8080, () => console.log(" Http Server Running on 8080"));
io.listen(8081);

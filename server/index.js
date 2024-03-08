const express = require("express");
const bodyparser = require("body-parser");
const { Server } = require("socket.io");

const io = new Server({
  cors: true,
});
const app = express();

app.use(bodyparser.json());

const emailToSocketMapping = new Map();

io.on("connection", (socket) => {
  console.log("new conection");
  socket.on("join-room", (data) => {
    const { roomId, email } = data;

    console.log("User : ", email, " Joined Room : ", roomId);
    emailToSocketMapping.set(email, socket.id);
    socket.join(roomId);
    socket.emit("joined-room", { roomId });
    socket.broadcast.to(roomId).emit("user-joined", { email });
  });
});

app.listen(8080, () => console.log(" Http Server Running on 8080"));
io.listen(8081);

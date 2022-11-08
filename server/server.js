const path = require("path");
const http = require("http");
const express = require("express");
const socketio = require("socket.io");
const formatMessages = require("./utils/messages");
const {
  getCurrentUser,
  userJoin,
  userLeave,
  getRoomUsers,
  users,
} = require("./utils/users");
const cors = require("cors");

const app = express();
const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));

const server = http.createServer(app);
const io = socketio(server);

//app.use(express.static(path.join(__dirname, "views")));

const botName = "ChatCord Bot";

// run when cient connects
io.on("connection", (socket) => {
  socket.on("joinRoom", ({ userName, room }) => {
    console.log("new user joined the room");
    // get user
    const user = userJoin(socket.id, userName, room);

    // socket.join() takes one parameter which is the room name
    socket.join(user.room);

    // emit => send to (single user who connected)
    socket.emit("message", formatMessages(botName, "Welcome to ChatCort"));

    // broadcast.emit => send to every one EXCEPT the one who just connected
    // added .to('room name') to semd message only to this specific room
    socket.broadcast
      .to(user.room)
      .emit(
        "message",
        formatMessages(botName, `${user.userName} has joined the chat`)
      );

    // when new user join (send data of all room users to => all users in this room)
    io.to(user.room).emit("roomUsers", {
      room: user.room,
      users: getRoomUsers(user.room),
    });
  });

  socket.on("disconnect", () => {
    const user = userLeave(socket.id);

    if (user) {
      // io.emit => send to all clients
      io.to(user.room).emit(
        "message",
        formatMessages(botName, `${user.userName} has left the chat`)
      );

      // when user disconnect (send data of all room users to => all users in this room)
      io.to(user.room).emit("roomUsers", {
        room: user.room,
        users: getRoomUsers(user.room),
      });
    }
  });

  // listen for chat message
  socket.on("chatMessage", (msg) => {
    const user = getCurrentUser(socket.id);
    console.log(socket.id, users);
    io.to(user.room).emit(
      "message",
      formatMessages(user.userName, msg, user.id)
    );
  });
});

const PORT = 4000;

server.listen(PORT, () => console.log("your server is runnning"));

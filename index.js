const express = require("express");
const socket = require("socket.io");
// app setup
const app = express();
const server = app.listen(process.env.PORT, function () {
  console.log("listening to requests on PORT");
});

// Static files
app.use(express.static("public"));

//  socket setup
const io = socket(server);
io.on("connection", function (socket) {
  console.log("made socket connection", socket.id);

  socket.on("chat", function (data) {
    io.sockets.emit("chat", data);
  });
  socket.on("typing", function (data) {
    socket.broadcast.emit("typing", data);
  });
});

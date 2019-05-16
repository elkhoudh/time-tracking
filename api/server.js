const express = require("express");
const { configureMiddleware } = require("../middleware");

// init express
const server = express();
// const server = require("http").createServer(app);
// const io = require("socket.io").listen(server);

// Configuring global middle ware
configureMiddleware(server);

// index route displays name
server.get("/", (req, res) => {
  res.send(
    '<h1 style="color: red; text-align: center; font-size: 40px;">SharkDreams</h1>'
  );
});

// io.sockets.on("connection", socket => console.log(socket));

module.exports = server;

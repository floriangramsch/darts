const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");
const next = require("next");

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();
  const httpServer = createServer(server);
  const io = new Server(httpServer);

  io.on("connection", (socket) => {
    console.log("Neue Verbindung:", socket.id);

    socket.on("dart-action", (data) => {
      console.log(data);
      // socket.broadcast.emit("update", data);
      io.emit("update", data);
    });

    socket.on("start-game", (data) => {
      io.emit("whos-turn", data);
    });

    socket.on("whos-turn", (data) => {
      io.emit("whos-turn", data);
    });

    socket.on("login", ({ data }) => {
      console.log(data);
      io.emit("logged", { ...data, id: socket.id });
    });

    socket.on("disconnect", () => {
      console.log("Verbindung getrennt:", socket.id);
      console.log("heil");
      io.emit("disconnected", socket.id);
    });

    socket.on("throw", (data) => {
      console.log("throw");
      io.emit("throwen", data);
    });
  });

  server.all("*", (req, res) => {
    return handle(req, res);
  });

  httpServer.listen(2525, () => {
    console.log("Server läuft auf http://localhost:2525");
  });
});

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
    // console.log("Neue Verbindung:", socket.id);

    socket.on("dart-action", (data) => {
      // Broadcast to other clients
      console.log(data);
      // socket.broadcast.emit("update", data);
      io.emit("update", data);
    });

    socket.on("disconnect", () => {
      console.log("Verbindung getrennt:", socket.id);
    });
  });

  server.all("*", (req, res) => {
    return handle(req, res);
  });

  httpServer.listen(3000, () => {
    console.log("Server läuft auf http://localhost:3000");
  });
});

const http = require("http");
const express = require("express");

const dotenv = require("dotenv");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
const server = http.createServer(app);

// .env config
dotenv.config();

// CORS_MIDDLEWARE
app.use(cors());

// io connection
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

// PORT connections
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.status(200).send("hello socket io");
});

app.get("/test", (req, res) => {
  res.status(200).json({
    status: "sucess",
    message: "hello socket io",
  });
});

// Whenever someone connects this gets executed
io.on("connection", (socket) => {
  console.log("a user connected");

  // Whenever someone disconnects this piece of code executed
  socket.on("disconnect", function () {
    console.log("A user disconnected");
  });
});

app.listen(PORT, () => {
  console.log(`App Running ON PORT ${PORT}`);
});

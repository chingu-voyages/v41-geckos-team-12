const { createServer } = require("http");
const { Server } = require("socket.io");

const PORT = 3000;

const httpServer = createServer();
const io = new Server(httpServer, {
  // options
});

io.on("connection", (socket) => {
  // ... add new tcp
});

httpServer.listen(PORT, () => `Server listening on port: ${PORT}`);

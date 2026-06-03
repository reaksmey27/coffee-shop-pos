require("dotenv").config();

const http = require("http");
const { Server } = require("socket.io");
const app = require("./app");
const AppDataSource = require("./src/config/datasource");

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

global.io = io;

io.on("connection", (socket) => {
  console.log("Client connected:", socket.id);
});

const PORT = process.env.PORT || 3000;

AppDataSource.initialize()
  .then(() => {
    console.log("Database connected");

    server.listen(PORT, () => {
      console.log(`Server running on ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("DB Error:", err);
  });
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const http = require("http");
const routes = require("./router");
const dotenv = require("dotenv");
const { setupWebSocket } = require("./websocket");

const app = express();
const server = http.Server(app);

setupWebSocket(server);
dotenv.config();

app.use(cors());
app.use(express.json());
app.use(routes);

// MongoDB Atlas
mongoose.connect(`${process.env.MONGODB_ATLAS}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
});

console.log("Server running in http://localhost:3333 ...");

server.listen(3333);

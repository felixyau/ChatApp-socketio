require("dotenv").config();

const jwt = require("jsonwebtoken");
const express = require("express");
const { Server } = require("socket.io");
const authRouter = require("./routers/authRouter")
const bodyParser = require('body-parser')
const app = express();
// const cors = require("cors");
// const pool = require("./db");
// const redisClient = require("./redis");
const server = require("http").createServer(app);

const io = require("socket.io")(server, {
    cors: {
        origin: ["http://localhost:3001","http://localhost:3000"]
    }
})

app.use(bodyParser.json()); //parse req as json
app.use("/auth", authRouter);

io.use(authorizeUser);
io.on("connection", socket=> {
    socket.on("custom", (message,room)=> {
        console.log(message)
        socket.broadcast.emit("new", message);
    })
})

server.listen(process.env.PORT || 4000, () => {
    console.log("Server listening on port " + (process.env.PORT || "4000"));
  });

function authorizeUser(req,res,next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) return res.sendStatus(401); //401 no token
  jwt.verify(token, ACCESS_TOKEN_SECRET, (err,user)=> {
      if (err) return res.sendStatus(403) //invalid token
      req.user = user;
      next();
  })
}

const jwtVerify = (token, secret) =>
  new Promise((resolve, reject) => {
    jwt.verify(token, secret, (err, decoded) => {
      if (err) reject(err);
      resolve(decoded);
    });
  });
require("dotenv").config();
const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require("cors");
const db = require("./models");

const usersRouter = require('./routers/user');
const trackRouter = require('./routers/track');
const playlistRouter = require('./routers/playlist');
const replyController = require('./routers/reply');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
  cors({
    origin: true,
    credentials: true,
    methods: ["GET", "DELETE", "POST", "PATCH"],
  })
);

app.get("/", (req, res) => {
  res.status(200).send("Welcome, hidden_track!!!!!!!!!! Server!");
});

// db.sequelize
//   .sync()
//   .then(() => {
//     console.log("db 연결 ")
//   })
//   .catch(console.error)


app.use('/user', usersRouter);
app.use('/track', trackRouter);
app.use('/playlist', playlistRouter);
app.use('/reply', replyController);

const HTTPS_PORT = 80;
let server;

app.listen(HTTPS_PORT, () => {
  console.log("server 실행");
});


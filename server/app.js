require("dotenv").config();
const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require("cors");
const db = require("./models");
const usersRouter = require('./routers/user');

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

// app.get("/", (req, res) => {
//   res.status(200).send("Welcome, closet Server!");
// });

db.sequelize
  .sync()
  .then(() => {
    console.log("db 연결 ")
  })
  .catch(console.error)


app.use('/user', usersRouter);


const HTTPS_PORT = 4000;
let server;

server = app.listen(HTTPS_PORT, () => {
  console.log("server 실행");
});

module.exports = server;
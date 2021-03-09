const express = require("express");
const socket = require("socket.io");
const path = require("path");
const expressLayouts = require("express-ejs-layouts");
//const { PORT } = require("./config");

const accounts = [
  {
    username: "abc",
    role: "x",
  },
  {
    username: "xyz",
    role: "x",
  },
];

const app = express();
// EJS
app.use(expressLayouts);
app.set("view engine", "ejs");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const server = require("http").createServer(app);
const io = socket(server);

app.use(express.static(path.join(__dirname, "public")));

app.get("/login", (req, res) => {
  res.render("login", {
    layout: "index",
  });
});

app.post("/login", (req, res) => {
  const isAccount = accounts.find((x) => x.username === req.body.username);
  if (isAccount) {
    res.redirect("/chat");
  } else res.send("failed");
});

// app.get("/", function (req, res) {
//   res.sendFile(path.join(__dirname + "/views/chat.html"));
// });

io.on("connection", function (socket) {
  console.log("Welcome to server chat");

  socket.on("send", function (data) {
    console.log(data);
    io.sockets.emit("send", data);
  });
});

server.listen(3000, () => {
  console.log(`Server run at 3000`);
});

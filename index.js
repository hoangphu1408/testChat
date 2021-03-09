const express = require("express");
const socket = require("socket.io");
const path = require("path");
const expressLayouts = require("express-ejs-layouts");
//const { PORT } = require("./config");

const accounts = [
  {
    id: "aDAsad51062281",
    username: "Phu",
  },
  {
    id: "sxCBswe15615216sS",
    username: "abc",
  },
  {
    id: "asdCW62188021qbbG",
    username: "xyz",
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

app.get("/", (req, res) => {
  res.render("login", {
    layout: "index",
  });
});

app.post("/", (req, res) => {
  const username = req.body.username;
  const isAccount = accounts.find((x) => x.username === username);
  if (isAccount) {
    res.redirect("/chat?username=" + username + "&id=" + isAccount.id);
  } else res.send("failed");
});

app.get("/chat", (req, res) => {
  const { username, id } = req.query;
  const user = {
    id: id,
    username: username,
  };
  res.render("chat", {
    layout: "index",
    user: user,
  });
});

// app.get("/", function (req, res) {
//   res.sendFile(path.join(__dirname + "/views/chat.html"));
// });

io.on("connection", function (socket) {
  socket.on("online", function (data) {
    console.log(data);
    io.sockets.emit("online", data);
  });
  socket.on("send", function (data) {
    console.log(data);
    io.sockets.emit("send", data);
  });
});

server.listen(3000, () => {
  console.log(`Server run at 3000`);
});

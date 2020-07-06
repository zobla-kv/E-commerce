const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");

app.use(express.static(path.join(__dirname, "..", "/public")));
app.use(express.static(path.join(__dirname, "..", "/public/js")));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");
app.use(bodyParser());

const user = {
  loggedIn: true,
  name: "Zobla",
};

app.get("/", (req, res) => {
  res.render("index", user);
});

app.get("/shop", (req, res) => {
  res.render("shop", user);
});

app.get("/about", (req, res) => {
  res.render("about", user);
});

app.post("/", (req, res) => {
  res.json("hello");
});

app.listen(4000);

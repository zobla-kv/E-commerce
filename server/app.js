// dependencies
const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");
const cors = require("cors");
require("dotenv").config();

// modules
const passportConfig = require("./models/login")(passport);
const setPassport = require("./middleware/setPassport");

// routers
const homeRouter = require("./routes/home");
const shopRouter = require("./routes/shop");
const aboutRouter = require("./routes/about");
const profileRouter = require("./routes/profile");
const dashboardRouter = require("./routes/dashboard");

app.use(cors());
app.use(express.static(path.join(__dirname, "..", "/public")));
app.use(express.static(path.join(__dirname, "..", "/public/js")));
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 60 * 60 * 24 },
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

mongoose.connect(process.env.DATABASE_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use("/", setPassport, homeRouter);

app.use("/shop", shopRouter);

app.use("/about", aboutRouter);

app.use("/profile", profileRouter);

app.use("/dashboard", dashboardRouter);

app.listen(4000);

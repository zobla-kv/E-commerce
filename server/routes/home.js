const router = require("express").Router();
const bodyParser = require("body-parser");
const reqType = require("../middleware/reqType");
const isAuth = require("../middleware/isAuth");
const login = require("../models/login");

router.use(bodyParser());

router.get("/", isAuth, (req, res) => {
  res.render("index", req.user);
});

// middlewares after reqtype called only for login
router.post("/", reqType, login, (req, res) => {
  if (req.user) res.status(200).json({ message: "success" });
  else res.status(400).json({ message: res.locals.failureInfo });
});

module.exports = router;

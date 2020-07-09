const express = require("express");
const router = express.Router();
const isAuth = require("../middleware/isAuth");

router.get("/", isAuth, (req, res) => {
  res.render("shop", req.user);
});

module.exports = router;

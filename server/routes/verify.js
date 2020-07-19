const router = require("express").Router();

router.get("/", (req, res) => {
  res.render("verify");
});

module.exports = router;

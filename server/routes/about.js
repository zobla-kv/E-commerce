const router = require("express").Router();

router.get("/", (req, res) => {
  res.render("about", { user: req.user });
});

module.exports = router;

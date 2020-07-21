const router = require("express").Router();
const globalController = require("../controllers/globalController");

router.get("/", (req, res) => {
  res.render("index", { user: req.user });
});

router.post("/", globalController);

module.exports = router;

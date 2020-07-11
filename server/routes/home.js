const router = require("express").Router();
const bodyParser = require("body-parser");
const globalController = require("../controllers/globalController");
const setUser = require("../middleware/setUser");

router.use(bodyParser());

router.get("/", setUser, (req, res) => {
  res.render("index", req.user);
});

router.post("/", globalController);

module.exports = router;

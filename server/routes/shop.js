const router = require("express").Router();
const setUser = require("../middleware/setUser");

router.get("/", setUser, (req, res) => {
  res.render("shop", req.user);
});

module.exports = router;

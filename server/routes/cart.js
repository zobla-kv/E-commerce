const router = require("express").Router();
const setUser = require("../middleware/setUser");
const cart = require("../controllers/cartController");

router.get("/", cart.get);

router.put("/", cart.add);

module.exports = router;

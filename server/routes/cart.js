const router = require("express").Router();
const cart = require("../controllers/cartController");
const isAuth = require("../middleware/isAuth");

router.get("/", isAuth, cart.get);

router.post("/", isAuth, cart.createOrder);

router.put("/", isAuth, cart.add);

router.delete("/", isAuth, cart.remove);

module.exports = router;

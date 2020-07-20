const router = require("express").Router();
const cart = require("../controllers/cartController");
const isAuth = require("../middleware/isAuth");

router.get("/", isAuth, cart.get);

router.post("/", cart.createOrder);

router.put("/", cart.add);

router.delete("/", cart.remove);

module.exports = router;

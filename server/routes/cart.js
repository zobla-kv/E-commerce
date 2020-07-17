const router = require("express").Router();
const cart = require("../controllers/cartController");

router.get("/", cart.get);

router.put("/", cart.add);

router.delete("/", cart.remove);

module.exports = router;

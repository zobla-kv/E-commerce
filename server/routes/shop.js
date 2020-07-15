const router = require("express").Router();
const setUser = require("../middleware/setUser");
const productController = require("../controllers/productController");

router.get("/", setUser, productController.getAll);

router.get("/products/:name", setUser, productController.getSingle);

module.exports = router;

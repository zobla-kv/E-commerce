const router = require("express").Router();
const productController = require("../controllers/productController");

router.get("/", productController.getAll);

router.get("/products/:name", productController.getSingle);

module.exports = router;

const router = require("express").Router();
const setUser = require("../middleware/setUser");
const productController = require("../controllers/productController");

router.get("/", setUser, productController.get);

module.exports = router;

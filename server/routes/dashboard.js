const router = require("express").Router();
const upload = require("express-fileupload");
const productController = require("../controllers/productController");
const ordersController = require("../controllers/ordersController");

router.use(upload());

router.get("/", ordersController.getAll);

router.post("/", productController.add);

router.delete("/", ordersController.remove);

module.exports = router;

const router = require("express").Router();
const upload = require("express-fileupload");
const productController = require("../controllers/productController");
const ordersController = require("../controllers/ordersController");
const isAuth = require("../middleware/isAuth");

router.use(upload());

router.get("/", isAuth, ordersController.getAll);

router.post("/", productController.add);

router.delete("/", ordersController.remove);

module.exports = router;

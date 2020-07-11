const router = require("express").Router();
const upload = require("express-fileupload");
const productController = require("../controllers/productController");

router.use(upload());

router.get("/", (req, res) => {
  res.render("dashboard", req.user);
});

router.post("/", productController.add);

module.exports = router;

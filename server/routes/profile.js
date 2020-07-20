const router = require("express").Router();
const profileController = require("../controllers/profileController");
const isAuth = require("../middleware/isAuth");

router.get("/", profileController.redirect);

router.get("/:id", isAuth, profileController.getUser);

router.put("/", profileController.changePassword);

module.exports = router;

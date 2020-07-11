const router = require("express").Router();
const profileController = require("../controllers/profileController");

router.get("/:id", profileController.getUser);
router.put("/", profileController.changePassword);

module.exports = router;

const router = require("express").Router();
const profileContoller = require("../controllers/profileController");

// prettier-ignore

router.get("/:jwt", profileContoller.verifyEmail);

module.exports = router;

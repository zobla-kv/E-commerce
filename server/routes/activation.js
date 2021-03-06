const router = require("express").Router();
const profileContoller = require("../controllers/profileController");

router.get("/", (req, res)=> {
    res.sendStatus(404);
})

router.get("/:jwt", profileContoller.verifyEmail);

module.exports = router;

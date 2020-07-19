const router = require("express").Router();
const profileContoller = require("../controllers/profileController");

// prettier-ignore
router.get("/", (req, res)=> {
    res.render('resetPassword')
});

router.get("/:jwt", profileContoller.verifyToken);

router.put("/:jwt", profileContoller.setNewPassword);

router.post("/", profileContoller.emailPasswordReset);

module.exports = router;

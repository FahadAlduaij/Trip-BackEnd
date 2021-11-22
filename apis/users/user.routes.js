const express = require("express");
const { signup, signin, fetchUsers } = require("./user.controller");
const router = express.Router();
const passport = require("passport");

router.get("/users", fetchUsers);
router.post("/signup", signup);
router.post(
	"/signin",
	passport.authenticate("local", { session: false }),
	signin
);

module.exports = router;

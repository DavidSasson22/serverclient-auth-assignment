const express = require("express");
const router = new express.Router();
const users = require("../controllers/user");
const auth = require("../middleWare/auth");

//Register new user
router.post("/register", (req, res) => users.registerUser(req, res));

//Login user
router.post("/login", (req, res) => users.logUser(req, res));

//Log out user
router.post("/logout", auth, (req, res) => users.logOut(req, res));

//Log out user from all devices
router.post("/logoutAll", auth, (req, res) => users.logOutAll(req, res));

//Get my info while loged in
router.get("/me", auth, async (req, res) => res.send(req.user));

//Edit user's info
router.patch("/me", auth, (req, res) => users.updateUser(req, res));

//Delete user  while loged in
router.delete("/me", auth, (req, res) => users.deleteUser(req, res));

module.exports = router;

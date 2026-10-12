const express = require("express");
const route = express.Router();

const {userSignUp,userLogin} = require("../controllers/authController.js")


route.post("/signup",userSignUp);

route.post("/login",userLogin);

module.exports = route;
const route = require("express").Router();

const {signUp, login} = require("../controller/userController");

route.post("/signUp",signUp);
route.post("/login",login);

module.exports = route;
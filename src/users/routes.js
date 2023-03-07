const {Router} = require("express");
const userRouter = Router();

const {hashPass, comparePass} = require("../middleware/index");
const {registerUser, login} = require("./controllers");
// Object Destructuring?

userRouter.post("/users/register", hashPass, registerUser);
userRouter.post("/users/login", comparePass, login);

module.exports = userRouter
const {Router} = require("express");
const userRouter = Router();

const {hashPass, comparePass} = require("../middleware/index");
const {registerUser, login} = require("./controllers");
// Object Destructuring?

userRouter.post("/users/register", hashPass, registerUser);
userRouter.post("/users/login", comparePass, login);
// The post request travels to server, to the URL, performs the functions in set order

module.exports = userRouter;
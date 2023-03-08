const {Router} = require("express");
const userRouter = Router();

const {hashPass, comparePass, tokenCheck} = require("../middleware/index");
const {registerUser, login, getAllUsers} = require("./controllers");
// Object Destructuring?

userRouter.post("/users/register", hashPass, registerUser);
userRouter.post("/users/login", comparePass, login);
userRouter.get("/users/getallusers", tokenCheck, getAllUsers); //Protected by authorisation
// The post request travels to server, to the URL, performs the functions in set order

module.exports = userRouter;
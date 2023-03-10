const {Router} = require("express");
const userRouter = Router();

// Middleware Functions
const {hashPass, comparePass, tokenCheck} = require("../middleware/index");

// User Functions
const {registerUser, login, getAllUsers, updateUser, deleteUser} = require("./controllers");
// Object Destructuring?

userRouter.post("/users/register", hashPass, registerUser);
userRouter.post("/users/login", comparePass, login);
userRouter.get("/user/authcheck", tokenCheck, login);
userRouter.get("/users/getallusers", tokenCheck, getAllUsers); //Protected by authorisation
// The post request travels to server, to the URL, performs the functions in set order

// New Routes
userRouter.put("/users/updateinfo", tokenCheck, updateUser);
userRouter.delete("/users/deleteuser/:username", tokenCheck, deleteUser);

module.exports = userRouter;
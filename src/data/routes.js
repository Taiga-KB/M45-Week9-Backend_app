const {Router} = require("express");
const dataRouter = Router();

const  {tokenCheck} = require("../middleware");

const {getFavBooks} = require("./controllers");

// dataRouter.get("/users/data/favbooks", tokenCheck, getFavBooks);

module.exports = dataRouter;
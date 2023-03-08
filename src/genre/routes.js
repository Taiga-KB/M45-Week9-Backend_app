const {Router} = require("express");
const genreRouter = Router();
const { tokenCheck } = require("../middleware");

const {
    addGenre,
    getAllBooks,
} = require("./controllers");

genreRouter.post("/genres/addgenre", tokenCheck, addGenre);
genreRouter.get("/genres/getbooksbygenre/:genre", getAllBooks);

module.exports = genreRouter;
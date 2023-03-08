const {Router} = require("express");
const bookRouter = Router();

const {addBook,
    getSingleBook, 
    getAllBooks, 
    updateBook, 
    deleteBook,
    deleteAllBooks
} = require("./controllers");

const {tokenCheck} = require("../middleware");

bookRouter.post("/books/addbook", tokenCheck, addBook);
bookRouter.get("/books/getbook/:title", getSingleBook)
bookRouter.get("/books/getallbooks", getAllBooks);
bookRouter.put("/books/updatebook", tokenCheck, updateBook);
bookRouter.delete("/books/deletebook/:title", tokenCheck, deleteBook);
bookRouter.delete("/books/deleteallbooks", deleteAllBooks);

module.exports = bookRouter;
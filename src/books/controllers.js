const Book = require("./model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// =====Add a book=====
const addBook = async (req, res) => {
    try {
        if(!req.authCheck) {
            const error = new Error("Not authorised");
            res.status(401).json({errorMsg: error.message, error:error});
        };
        const book = await Book.create(req.body);
        console.log(book);
        res.status(201).json({message: "Success", newbook: book});
    } catch (error) {
        res.status(501).json({errorMsg: error.message, error: error});
    }
};

// =====Find specific book by title=====
const getSingleBook = async (req, res) => {
    try {
        const getBook = await Book.findOne({
            where: {
                title: req.params.title
            }
        });
        res.status(200).json({message: "Success", book: getBook});
    } catch (error) {
        res.status(501).json({errorMsg: error.message, error: error});
    }
};

// =====Get all books=====
const getAllBooks = async (req, res) => {
    try {
        const allBooks = await Book.findAll();
        res.status(200).json({message: "Success", books: allBooks});
    } catch (error) {
        res.status(501).json({errorMsg: error.message, error: error});
    }
};

// =====Update existing book=====
const updateBook = async (req, res) => {
    try {
        if(!req.authCheck) {
            const error = new Error("Not authorised");
            res.status(401).json({errorMsg: error.message, error:error});
        };
        const updatedBook = await Book.update({[req.body.updateKey]: req.body.updateValue}, {
            where: {
                title: req.body.title
            }
        });
        res.status(201).json({message: "Success", updateResult: updatedBook});
    } catch (error) {
        res.status(501).json({errorMsg: error.message, error: error});
    }
};

// =====Delete book from DB=====
const deleteBook = async (req, res) => {
    try {
        if(!req.authCheck) {
            const error = new Error("Not authorised");
            res.status(401).json({errorMsg: error.message, error:error});
        };
        const deleteABook = await Book.destroy({
            where: {
                title: req.params.title
            }
        });
        res.status(201).json({message: "Success", result: deleteABook});
    } catch (error) {
        res.status(501).json({errorMsg: error.message, error: error});
    }
};

// =====DELETE EVERYTHING=====
const deleteAllBooks = async (req, res) => {
    try {
        if(!req.authCheck) {
            const error = new Error("Not authorised");
            res.status(401).json({errorMsg: error.message, error:error});
        };
        const deleteAll = await Book.destroy({
            truncate: true
        });
    } catch (error) {
        res.status(501).json({errorMsg: error.message, error: error});
    }
};

module.exports = {
    addBook,
    getSingleBook,
    getAllBooks,
    updateBook,
    deleteBook,
    deleteAllBooks
};
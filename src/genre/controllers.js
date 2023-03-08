const Genre = require("./model");
const Book = require("../books/model");

// =====Add genre=====
const addGenre = async (req, res) => {
    try {
        if(!req.authCheck) {
            const error = new Error("Not authorised");
            res.status(401).json({errorMsg: error.message, error:error});
        };
        const newGenre = await Genre.create(req.body);
        res.status(201).json({message: "Success", genre: newGenre});
    } catch (error) {
        res.status(501).json({errorMsg: error.message, error:error});
    }
};

// =====Find all books by genre=====
const getAllBooks = async (req, res) => {
    try {
        const findGenre = await Genre.findAll({
            where: {
                genre: req.params.genre
            },
            include: Book,
        });
        res.status(200).json({message: "Success", booksByGenre: findGenre});
    } catch (error) {
    res.status(501).json({errorMsg: error.message, error:error});
    }
};

module.exports = {
    addGenre,
    getAllBooks,
};
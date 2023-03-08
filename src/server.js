require("dotenv").config();
const express = require("express");
const port = process.env.PORT || 5001;
// PORT 80 is default for localhost, in routes for request 80 does not
// need to be specified
const userRouter = require("./users/routes");
const User = require("./users/model");
const bookRouter = require("./books/routes");
const Book = require("./books/model");
const genreRouter = require("./genre/routes")
const Genre = require("./genre/model");

const app = express();
app.use(express.json());

const syncTables = () => {
    Genre.hasMany(Book);
    Book.belongsTo(Genre);

    User.sync({alter: true, force: false})
    Book.sync({alter: true, force: false})
    Genre.sync({alter: true, force: false})
};

app.use(userRouter);
app.use(bookRouter);
app.use(genreRouter);

app.get("/health", (req, res) => 
    res.status(200).json({message: "API is working"
}));

app.listen(port, () => {
    syncTables();
    console.log(`Server is listening on port ${port}`)
});

// =====ERRORS=====
// parseInt(salt) in case the value is being read as a string
// console.log(typeof(salt)) to find out what the data type is (string, integer, boolean)
// Data and hash arguments required: Check functions, trying to find something specified

// 200 is the status code for a successful get request
// 401 Not authorised

// TO-DO
// Add: add a book model/controllers/routes to allow for the four CRUD operations
// Use previous Sequelize repo as reference
// Protect any routes that add/edit/delete data from the database

// Adding genre routes for fun I guess
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const port = process.env.PORT || 5001;
// PORT 80 is default for localhost, in routes for request 80 does not
// need to be specified
const userRouter = require("./users/routes");
const User = require("./users/model");
const bookRouter = require("./books/routes");
const Book = require("./books/model");
const genreRouter = require("./genre/routes")
const Genre = require("./genre/model");

const dataRouter = require("./data/routes");
const Data = require("./data/model");

const app = express();
app.use(cors());
app.use(express.json());

const syncTables = () => {
    // Relationships first, then sync in order: Genre > Book > etc
    Book.belongsToMany(User, {through: "Data"});
    User.belongsToMany(Book, {through: "Data"});

    Genre.hasMany(Book);
    Book.belongsTo(Genre);

    Book.sync({alter: true, force: false})
    User.sync({alter: true, force: false})
    Data.sync({alter: true, force: false})
    Genre.sync({alter: true, force: false})
};

app.use(userRouter);
app.use(dataRouter);
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

// =====TO-DO=====
// Figure out data storage table and its relationship to users and books

// Data Storage needs foreign keys of:
// user ID in Users & Book ID? in Books

// Genre hasMany Book
// Book belongsTo genre: GenreId is foreign key from Genre table
// Book belongsTo Author: AuthorId is foreign key from authors table

// User has many books through data storage? 
// Book belongs to many User through data storage?
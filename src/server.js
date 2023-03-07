require("dotenv").config();
const express = require("express");
const port = process.env.PORT || 5001;
// PORT 80 is default for localhost, in routes for request 80 does not
// need to be specified
const userRouter = require("./users/routes");
const User = require("./users/model");

const app = express();
app.use(express.json());

const syncTables = () => {
    User.sync({alter: true, force: false})
};

app.use(userRouter);

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
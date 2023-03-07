const bcrypt = require("bcrypt");
const User = require("./model");

// =====1.Add/Post new user to DB=====
// Responds/console with user and email. Pass omitted
const registerUser = async (req, res) => {
    try {
        const user = await User.create(req.body)
        console.log(user)
        res.status(201).json ({
            message: "Success",
            user: {username: req.body.username, email: req.body.email},
        });
    } catch (error) {
        res.status(501).json({errorMsg: error.message, error: error})
    }
};

// =====3.Login with password=====
// If password match, respond with user details. Pass omitted
const login = async (req, res) => {
    try {
        res.status(201).json({
            message: "Success", 
            user: {username: req.user.username, email: req.user.email}
        });
    } catch (error) {
        res.status(501).json({errorMsg: error.message, error: error})
    }
};

module.exports = {
    registerUser,
    login,
};
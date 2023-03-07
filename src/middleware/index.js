const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const salt = process.env.SALT_ROUNDS;
const User = require("../users/model");
// Security risk: Might be known that a password has been hashed 10 times and can undo it
// More rounds of hashing, more security

// =====2.Function to obscure desired password onto DB=====
const hashPass = async (req, res, next) => {
    try {
        const hashedPass = await bcrypt.hash(req.body.password, parseInt(salt));
        req.body.password = hashedPass;
        console.log(req.body);
        console.log(hashedPass);
        next();
    } catch (error) {
        res.status(501).json({errorMsg: error.message, error: error});
    }
};

// =====4.Find specific user and compare passwords to match=====
// object.compare returns true or false
// Perhaps add more error handling with if statements?
const comparePass = async (req, res, next) => {
    try {
        req.user = await User.findOne({where: {username: req.body.username}});
        console.log(req.user);
        const matchPass = await bcrypt.compare(req.body.password, req.user.password);
        if (!matchPass) {
            const error = new Error("Password does not match");
            res.status(500).json({errorMsg: error.message, error: error});
        };
        next();
    } catch (error) {
        res.status(501).json({errorMsg: error.message, error: error});
    }
};

// =====5.Checks ID token=====
const tokenCheck = async (req, res, next) => {
    try {
        const token = req.header("Authorization");
        const decToken = await jwt.verify(token, process.env.SECRET);
        const user = await User.findOne({where: {id: decToken.id}});
        if (!user) {
            const error = new Error("User is not authorised")
            res.status(401).json({errorMsg: error.message, error: error});
        }
        req.authCheck = user;
        next();
    } catch (error) {
        res.status(501).json({errorMsg: error.message, error: error});
    }
};

module.exports = {
    hashPass,
    comparePass,
    tokenCheck,
};
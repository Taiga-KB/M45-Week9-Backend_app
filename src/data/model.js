const {DataTypes} = require("sequelize");
const connection = require("../db/connection");

const Data = connection.define("Data", {
    
}, {timestamps: false}
);

module.exports = Data;
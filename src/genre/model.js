const { DataTypes } = require("sequelize");
const connection = require("../db/connection");

const Genre = connection.define("Genre", {
    genre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {timestamps: false, indexes: [{unique: true, fields: ["genre"]}]}
  );
  
  module.exports = Genre;
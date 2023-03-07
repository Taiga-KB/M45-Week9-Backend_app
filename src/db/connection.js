const {Sequelize} = require("Sequelize");

const connection = new Sequelize(process.env.MYSQL_URI, {
    retry: {match: [/Deadlock/i], max: 3}
});
// Regular expression

connection.authenticate();

module.exports = connection;
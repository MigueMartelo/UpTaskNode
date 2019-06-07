const Sequelize = require('sequelize');

const sequelize = new Sequelize('b0ozadgvibfaqf4bz3n5', 'ul0m3zirp3lew07h', '1iTgcxMjxXUz8Fl830kl', {
	host: 'b0ozadgvibfaqf4bz3n5-mysql.services.clever-cloud.com',
	dialect: 'mysql',
	port: '3306',
	operatorAliases: false,
	define: {
		timestamps: false
	},
	pool: {
		max: 5,
		min: 0,
		acquire: 30000,
		idle: 10000
	}
});

module.exports = sequelize;

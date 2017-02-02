var Sequelize = require('sequelize');

const Conn = new Sequelize(
	'tkm', // db
	'postgres', // username
	'postgres', // password
	{
		dialect: 'postgres',
		host: 'localhost',
		port: 5432,
		idleTimeoutMillis: 15000
	}
);

// users - table-name (db - model)
const User = Conn.define('users', {
	firstName: {
		type: Sequelize.STRING,
		allowNull: false
	},
	lastName: {
		type: Sequelize.STRING,
		allowNull: true
	},
	email: {
		type: Sequelize.STRING,
		allowNull: false,
		validate: {
			isEmail: true
		}
	}
}, {
	timestamps: false // (if fields createdAt, updatedAt don't exists)
});

const City = Conn.define('cities', {
	name: {
		type: Sequelize.STRING,
		allowNull: false
	},
	airportCode: {
		type: Sequelize.STRING,
		allowNull: false
	},
	latitude: {
		type: Sequelize.FLOAT,
		allowNull: false
	},
	longitude: {
		type: Sequelize.FLOAT,
		allowNull: false
	}
}, {
	timestamps: false // (if fields createdAt, updatedAt don't exists)
});

const Music = Conn.define('music', {
	title: {
		type: Sequelize.STRING,
		allowNull: false
	},
	content: {
		type: Sequelize.STRING,
		allowNull: false
	}
}, {
	timestamps: false // (if fields createdAt, updatedAt don't exists)
});

// Relationships
User.hasMany(Music); // one to many
Music.belongsTo(User); // one to one

module.exports = Conn;
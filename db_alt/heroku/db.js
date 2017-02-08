var Sequelize = require('sequelize');

const Conn = new Sequelize(
	'd8vhfur6n1bseb', // db
	'wqrmhfnwrignzc', // username
	'5aa82081405e7fe5fe119ec19efe91b739605995f59aa75a940a59d28f1ecc49', // password
	{
		dialect: 'postgres',
		host: 'ec2-54-243-38-139.compute-1.amazonaws.com',
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
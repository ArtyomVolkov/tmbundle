const express = require('express');
const graphql = require('graphql');
var GraphHTTP = require('express-graphql');
var Schema = require('./schema');
const router = express.Router();
const pg = require('pg');
const DB_CONFIG = {
	user: 'tm',
	database: 'tkm',
	password: '123456',
	host: 'localhost',
	port: 5432,
	max: 10,
	idleTimeoutMillis: 20000
};

const App = express();
App.use('/', router);
App.listen(8081, function () {
	console.log('****** Server is listening on 8081 port ******');
});

const pool = new pg.Pool(DB_CONFIG);

/*
 * Routes
 */
// Get users
router.get('/api/v1/users', (req, res) => {

	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

	pool.connect((err, db, done) => {
		if (err) {
			done();
			return res.status(500).json({success: false, data: err});
		}

		db.query('SELECT * from users').
		then((result)=> {
			done();
			return res.status(200).json(result.rows);
		}).
		catch((err) => {
			done();
			return res.status(500).json({success: false, data: err});
		});
	});

	pool.on('error', (err) => {
		console.error('idle client error', err.message, err.stack);
		return res.status(500).json({success: false, data: err});
	});
});


// config
var APP_PORT = 3000;
var app = express();

app.use('/graphql', GraphHTTP({
	schema: Schema,
	pretty: true,
	graphiql: true
}));

app.listen(3000, ()=> {
	console.log(`App listening on port: ${APP_PORT}`);
});
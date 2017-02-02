const express = require('express');
const cors = require('cors');
const graphql = require('graphql');
const GraphHTTP = require('express-graphql');
var Schema = require('./schema');
const router = express.Router();
const pg = require('pg');
const DB_CONFIG = {
	user: 'postgres',
	database: 'tkm',
	password: 'postgres',
	host: 'localhost',
	port: 5432,
	max: 10,
	idleTimeoutMillis: 20000
};

const pool = new pg.Pool(DB_CONFIG);
const App = express();

App.use(cors());
App.use('/', router);
App.use('/api/v1/tkm', GraphHTTP({
	schema: Schema,
	pretty: true,
	graphiql: true
}));

App.listen(8081, function () {
	console.log('****** Server is listening on 8081 port ******');
});

/*
 * Routes
 */
// Get users
router.get('/api/v1/users', (req, res) => {
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


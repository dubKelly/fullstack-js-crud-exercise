const express = require('express');
const router = express.Router();
const { Client } = require('pg');
const connectionString = require('../config/keys').DATABASE_URL;

const client = new Client({
	connectionString: connectionString
});
client.connect();

router.get('/', (req, res, next) => {
	client.query('SELECT * FROM employees', (err, res) => {
		if (err) {
			console.log(err);
			return next(err);
		}
		// res.send(res.rows[0]);
		console.log('success');
	});
});

router.post('/', (req, res, next) => {
	client.query(
		'INSERT INTO employees(id, name, code, profession, color, city, branch, assigned) VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
		[
			req.body.id,
			req.body.name,
			req.body.code,
			req.body.profession,
			req.body.color,
			req.body.city,
			req.body.branch,
			req.body.assigned
		],
		(err, res) => {
			if (err) {
				console.log(err.stack);
			} else {
				console.log(res.rows[0]);
			}
		}
	);
});

module.exports = router;

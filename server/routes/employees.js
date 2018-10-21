const express = require('express');
const router = express.Router();
const cors = require('cors');
const { Client } = require('pg');
const connectionString = require('../config/keys').DATABASE_URL;

// Cors
const corsOptions = {
	origin: 'http://localhost:3000',
	optionsSuccessStatus: 200
};

const client = new Client({
	connectionString: connectionString
});

client.connect(err => {
	if (err) {
		console.error('connection error', err.stack);
	} else {
		console.log('connected to pg');
	}
});

router.get('/', cors(), (req, res, next) => {
	client.query('SELECT * FROM employees', (err, result) => {
		if (err) {
			console.log(err);
			return next(err);
		}
		res.send(result.rows);
	});
});

router.post('/', cors(), (req, res, next) => {
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
		(err, result) => {
			if (err) {
				res.send(err.stack);
			} else {
				res.json(result.rows[0]);
			}
		}
	);
});

router.put('/', cors(), (req, res, next) => {
	client.query(
		'UPDATE employees SET name = $2, code = $3, profession = $4, color = $5, city = $6, branch = $7, assigned = $8 WHERE id = $1',
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
		(err, result) => {
			if (err) {
				res.send(err.stack);
			} else {
				res.json(result.rows[0]);
			}
		}
	);
});

router.delete('/', cors(), (req, res, next) => {
	client.query(
		'DELETE FROM employees WHERE id = $1',
		[req.body.employeeId],
		(err, result) => {
			if (err) {
				console.log(err);
				return next(err);
			}
			res.send(result.rows);
		}
	);
});

module.exports = router;

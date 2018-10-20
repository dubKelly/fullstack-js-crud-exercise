const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const app = express();
// const employees = require('./data/employees.json');

const employees = require('./routes/employees');

// Body Parser Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors
// var corsOptions = {
// 	origin: 'http://localhost:3000',
// 	optionsSuccessStatus: 200
// };

app.use(function(req, res, next) {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Credentials', 'true');
	res.setHeader(
		'Access-Control-Allow-Methods',
		'GET,HEAD,OPTIONS,POST,PUT,DELETE'
	);
	res.setHeader(
		'Access-Control-Allow-Headers',
		'Access-Control-Allow-Headers, Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, Authorization'
	);

	res.setHeader('Cache-Control', 'no-cache');
	next();
});

// app.get('/api/employees', cors(corsOptions), (req, res, next) => {
// 	console.log('/api/employees');
// 	res.setHeader('Content-Type', 'application/json');
// 	res.status(200);
// 	res.send(JSON.stringify(employees, null, 2));
// });

// Routes
app.use('/api/employees', employees);

// Serve static in production
if (process.env.NODE_ENV === 'production') {
	app.use(express.static(path.join(__dirname, '../build')));

	app.get('*', (req, res) => {
		res.sendFile(path.resolve(__dirname, '../build', 'index.html'));
	});
}

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => console.log(`server running on port ${PORT}`));

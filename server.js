const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const app = express();
// const employees = require('./data/employees.json');

const employees = require('./server/routes/employees');

// Body Parser Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors
const corsOptions = {
	origin: 'http://localhost:3000',
	optionsSuccessStatus: 200
};

// Routes
app.use('/api/employees', cors(corsOptions), employees);

// Serve static in production
if (process.env.NODE_ENV === 'production') {
	app.use(express.static('build'));

	app.get('*', (req, res) => {
		res.sendFile(path.resolve(__dirname, 'build', 'index.html'));
	});
}

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => console.log(`server running on port ${PORT}`));

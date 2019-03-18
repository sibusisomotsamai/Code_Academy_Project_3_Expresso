const express  = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const errorhandler = require('errorhandler');
const morgan = require('morgan');

const PORT = process.env.PORT || 4000;

const apiRouter = require('./api/api');

app.use(bodyParser.json());
app.use(cors());

if (process.env.NODE_ENV === 'development') {
	app.use(errorhandler());
}

app.use(morgan('dev'));
app.use('/api', apiRouter);

app.listen(PORT, () => {
	console.log(`Server is listening on port ${PORT}`);
});

module.exports = app;

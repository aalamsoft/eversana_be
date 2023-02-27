const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();
const routes = require('./routes/v1');
const app = express();
var moment = require('moment');
moment().format();

// middlewares
app.use(morgan('dev'));
app.use(express.static('public'));
let corsOptions;
if (process.env.NODE_ENV == 'development') {
	corsOptions = {
		origin: `${process.env.CLIENT_URL}`,
		optionsSuccessStatus: 200,
		credentials: true,
	};
}
else {
	corsOptions = { origin: '*', optionsSuccessStatus: 200, credentials: true };
}

app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/api', routes);
const port = process.env.PORT || 5050;
app.listen(port, () => {
	console.log(`server is running on port ${port}`);
});


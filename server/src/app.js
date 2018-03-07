const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const routes = require('./routes');
const mongoose = require('mongoose');
const cors = require('cors');
const validator = require('express-validator');

const app = express();

app.use(cors());
app.use(morgan('combined'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(validator());
app.use('/', routes);

app.use((err, req, res, next) => {
	if(err) {
		res.send({errors: err});
	}
	next();
});

mongoose.connect('mongodb://localhost:27017/forum-app', function(err) {
	if(err) console.log(err);
	console.log('Connected to Database');
	app.listen(process.env.PORT || 8081, function() {
		console.log('Listening on port 8081');
	});
});

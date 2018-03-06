const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const app = express();

app.use(morgan('combined'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.get('/', (req, res) => {
	res.send({
		message: 'Hello'
	});
});

app.listen(process.env.PORT || 8081, function() {
	console.log('Listening on port 8081');
});
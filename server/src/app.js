const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const routes = require('./routes');
const mongoose = require('mongoose');
const cors = require('cors');
const validator = require('express-validator');
const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('./models/user');

const app = express();

app.use(cors());
app.use(morgan('combined'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(validator());
app.use(passport.initialize());

var opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = 'secret';
passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
	User.findOne({_id: jwt_payload.user.id}, function(err, user) {
		if(err) {
			return done(err, false);
		}
		else if(user) {
			return done(null, {id: user._id, email: user.email});
		}
		else {
			return done(null, false);
		}
	});
}));

app.use('/', routes);

app.use((err, req, res, next) => {
	if(err) {
		res.status(400).send({errors: err});
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

const User = require('../models/user');
const bcrypt = require('bcrypt');

const AuthController = {
	register: (req, res, next) => {
		req.check('email', 'Email must be valid.').isEmail();
		req.check('password', 'Password must not be empty.').notEmpty();
		var errors = req.validationErrors();
		if(errors) {
			next(errors);
		}
		else {
			var email = req.body.email;
			var password = req.body.password;
			var user = new User({
				email: email,
				password: password
			});
			user.save(function(err) {
				if(err) {
					next([{msg: 'Email already exists!'}]);
				}
				else res.send(user);
			});
		}
		
	},
	login: (req, res, next) => {
		req.check('email', 'Email must be valid.').isEmail();
		req.check('password', 'Password must not be empty.').notEmpty();
		var errors = req.validationErrors();
		if(errors) {
			next(errors);
		}
		else {
			var email = req.body.email;
			var password = req.body.password;
			User.findOne({email: email})
			.then(function(response) {
				if(response) {
					console.log(response);
					bcrypt.compare(password, response.password)
					.then(function(flag) {
						if(flag) {
							res.send({email: email});
						}
						else next([{msg: 'Invalid Email/Password'}]);
					})
					.catch(function(err) {
						console.log(err);
						next([{msg: 'Invalid Email/Password'}]);
					});
				}
				else {
					next([{msg: 'Invalid Email/Password'}]);
				}
			})
			.catch(function(err) {
				next([{msg: 'Invalid Email/Password'}]);
			})
		}
	}
};

module.exports = AuthController;
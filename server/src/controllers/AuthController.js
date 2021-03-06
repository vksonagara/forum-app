const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

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
				else res.send({msg: 'Registered User Successfully!'});
			});
		}	
	},
	login: async (req, res, next) => {
		req.check('email', 'Email must be valid.').isEmail();
		req.check('password', 'Password must not be empty.').notEmpty();
		var errors = req.validationErrors();
		if(errors) {
			next(errors);
		}
		else {
			var email = req.body.email;
			var password = req.body.password;
			try {
				var user = await User.findOne({email: email});
				if(user) {
					var flag = await bcrypt.compare(password, user.password);
					if(flag) {
						const expireTime = Math.floor(Date.now()/1000) + 7*24*60*60;
						var token = jwt.sign({
							exp: expireTime,
							user: {
								id: user._id,
								email: user.email
							}
						}, 'secret');
						res.send({token: token});
					}
					else {
						next([{msg: 'Invalid Email/Password'}]);
					}
				}
				else {
					next([{msg: 'Invalid Email/Password'}]);
				}	
			}
			catch(err) {
				next([{msg: 'Invalid Email/Password'}]);
			} 
		}
	},
	test: (req, res, next) => {
		res.send(req.user);
	}
};

module.exports = AuthController;
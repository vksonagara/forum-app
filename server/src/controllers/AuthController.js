const User = require('../models/user');

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
				else res.json(user);
			});
		}
		
	}
};

module.exports = AuthController;
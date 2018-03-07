const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
	email: {
		type: String,
		unique: true
	},
	password: String
});

const User = mongoose.model('users', UserSchema);

UserSchema.pre('save', function(next) {
	var user = this;
	bcrypt.hash(user.password, 10, function(err, hash) {
		if(err) {
			return next(err);
		}
		else {
			user.password = hash;
			console.log(this.password);
			next();
		}
	});
});

// UserSchema.statics.authenticate = function(user, callback) {
// 	User.find({email: user.email})
// 	.then(function(response) {
// 		if(response) {
// 			bcrypt.compare(user.password, response.password, function(err, flag) {
// 				if(flag) {
// 					callback(null, flag);
// 				}
// 				else {
// 					callback({msg: "Invalid Email/Password"});
// 				}
// 			})
// 		}
// 		else {
// 			callback({msg: "Invalid Email/Password"});
// 		}
// 	});
// }

module.exports = User;
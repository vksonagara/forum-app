const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
	email: {
		type: String,
		unique: true
	},
	password: String,
	forums: [{
		type: Schema.Types.ObjectId,
		ref: 'forums'
	}],
	comments: [{
		type: Schema.Types.ObjectId,
		ref: 'comments'
	}]
});

const User = mongoose.model('users', UserSchema);

UserSchema.pre('save', function(next) {
	var user = this;
	if(this.isNew) {
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
	}
	else {
		next();
	}
});

module.exports = User;
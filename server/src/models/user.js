const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const Schema = mongoose.Schema;

const ForumSchema = new Schema({
	title: String,
	description: String,
	created_at: Date,
	updated_at: Date,
	user: {
		type: Schema.Types.ObjectId,
		ref: 'users'
	}
});

const UserSchema = new Schema({
	email: {
		type: String,
		unique: true
	},
	password: String,
	forums: [{
		type: Schema.Types.ObjectId,
		ref: 'forums'
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

UserSchema.pre('update', function(next) {
	next();
});

module.exports = User;
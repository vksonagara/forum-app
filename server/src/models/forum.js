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

const Forum = mongoose.model('forums', ForumSchema);

module.exports = Forum;
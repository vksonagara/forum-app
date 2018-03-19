const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ForumSchema = new Schema({
	title: String,
	description: String,
	created_at: Date,
	updated_at: Date,
	user: {
		type: Schema.Types.ObjectId,
		ref: 'users'
	},
	comments: [{
		type: Schema.Types.ObjectId,
		ref: 'comments'
	}],
	total_comments: {
		type: Number,
		default: 0
	}
});

const Forum = mongoose.model('forums', ForumSchema);

module.exports = Forum;
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CommentSchema = new Schema({
	text: String,
	created_at: Date,
	updated_at: Date,
	user: {
		type: Schema.Types.ObjectId,
		ref: 'users'
	},
	forum: {
		type: Schema.Types.ObjectId,
		ref: 'forums'
	}
});

const Comment = mongoose.model('comments', CommentSchema);

module.exports = Comment;
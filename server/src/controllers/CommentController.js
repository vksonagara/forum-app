const Comment = require('../models/comment');
const User = require('../models/user');
const Forum = require('../models/forum');

module.exports = {
	create: async (req, res, next) => {
		try {
			let user = await User.findOne({_id: req.user.id});
			let forum = await Forum.findOne({_id: req.body.forum_id});
			let comment = new Comment({
				text: req.body.comment_text,
				created_at: Date.now(),
				updated_at: Date.now(),
				user: user._id,
				forum: forum._id
			});
			comment.save();
			user.comments.push(comment._id);
			user.save();
			forum.comments.push(comment._id);
			forum.total_comments++;
			forum.save();
			res.send(comment); 
		}
		catch(err) {
			next([{msg: 'Can not post commnet due to some error!'}]);
		}
	},
	getForumComments: async (req, res, next) => {
		try {
			let forum = await Forum.findOne({_id: req.params.forumId});
			let comments = await Comment.find({forum: forum._id}).populate({path: 'user', select:'email'});
			res.send(comments);

		} catch(err) {
			next([{msg: 'Can not get commnet due to some error!'}]);
		}
	}
}
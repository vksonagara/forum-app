const User = require('../models/user');
const Forum = require('../models/forum');

const ForumController = {
	getAll: async (req, res, next) => {
		try {
			var forums = await Forum.find({}).populate('user');
			res.send(forums);
		}
		catch(err) {
			next(err);
		}
	},
	create: async (req, res, next) => {
		try {
			var user = await User.findOne({_id: req.user.id});
			var forum = new Forum({
				title : req.body.title,
				description : req.body.description,
				created_at : Date.now(),
				updated_at : Date.now(),
				user: user._id
			});
			forum.save();
			res.send('Forum Created!');
		}
		catch(err) {
			next([{msg: 'Can not create forum due to some error!'}]);
		}
	},
	get: async (req, res, next) => {
		var id = req.params.id;
		try {
			var forum = await Forum.findOne({_id: id}).populate('user');
			res.send(forum);
		}
		catch(err) {
			next([{msg: 'No forum with given id!'}]);
		}
	},
	update: async (req, res, next) => {
		try {
			var id = req.body.id;
			var forum = await Forum.findOne({_id: id});
			forum.title = req.body.title;
			forum.description = req.body.description;
			forum.updated_at = Date.now();
			forum.save();
			res.send(forum);
		}
		catch(err) {
			next([{msg: 'Can not update forum!'}]);
		}
	},
	delete: async (req, res, next) => {
		try {
			var id = req.body.id;
			var forum = await Forum.findOne({_id: id});
			forum.remove();
			res.send(forum);
		}
		catch(err) {
			next([{msg: 'Can not delete forum!'}]);
		}
	}
};

module.exports = ForumController;
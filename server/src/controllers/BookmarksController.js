const User = require('../models/user');
const _ = require('lodash');

const BookmarksController = {
	create: async (req, res, next) => {
		try {
			let user = await User.findOne({_id: req.user.id});
			let bookmark = {
				title: req.body.title,
				forum: req.body.forumId,
				created_at: Date.now(),
				updated_at: Date.now()
			};
			user.bookmarks.push(bookmark);
			user.save();
			res.send(user.bookmarks);
		} catch(err) {
			next([{msg: 'Error occured'}]);
		}
	},
	get: async (req, res, next) => {
		try {
			let user =  await User.findOne({_id: req.user.id});
			let bookmarks = user.bookmarks;
			res.send(bookmarks);
		} catch(err) {
			next([{msg: 'Error occured'}]);
		}
	},
	update: async (req, res, next) => {
		try {
			let user = await User.findOne({_id: req.user.id});
			let bookmarkId = req.body.bookmarkId;
			let bookmark = user.bookmarks.find(b => b._id == bookmarkId);
			bookmark.title = req.body.title;
			user.save();
			res.send(user.bookmarks);
		} catch(err) {
			next([{msg: 'Error occured'}]);
		}
	},
	delete: async (req, res, next) => {
		try {
			let userId = req.user.id;
			let bookmarkId = req.body.bookmarkId;
			let user = await User.findByIdAndUpdate({_id: userId}, {$pull: {bookmarks: {_id: bookmarkId}}}, {safe: true});
			res.send('Bookmark deleted!');
		} catch(err) {
			next([{msg: 'Error occured'}]);
		}
	}
};

module.exports = BookmarksController;
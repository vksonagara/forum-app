const express = require('express');
const router = express.Router();
const AuthController = require('./controllers/AuthController');
const passport = require('passport');
const ForumController = require('./controllers/ForumController');
const CommentController = require('./controllers/CommentController');

router.get('/', (req, res) => {
	res.send({
		message: 'Hello'
	});
});

//Auth Routes
router.post('/register', AuthController.register);
router.post('/login', AuthController.login);
router.post('/test', passport.authenticate('jwt', {session: false}), AuthController.test);

//Forum Routes
router.post('/forums/create', passport.authenticate('jwt', {session: false}), ForumController.create);
router.get('/forums', ForumController.getAll);
router.get('/forums/:id', ForumController.get);
router.post('/forums/update', passport.authenticate('jwt', {session: false}), ForumController.update);
router.delete('/forums/delete', passport.authenticate('jwt', {session: false}), ForumController.delete);
router.get('/me/forums', passport.authenticate('jwt', {session: false}), ForumController.getMyForums);
router.get('/email', passport.authenticate('jwt', {session: false}), ForumController.getEmail);

//Comment Routes
router.post('/comments/create', passport.authenticate('jwt', {session: false}), CommentController.create);
router.get('/comments/:forumId', CommentController.getForumComments);

module.exports = router;

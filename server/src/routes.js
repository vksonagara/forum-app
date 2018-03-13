const express = require('express');
const router = express.Router();
const AuthController = require('./controllers/AuthController');
const passport = require('passport');
const ForumController = require('./controllers/ForumController');

router.get('/', (req, res) => {
	res.send({
		message: 'Hello'
	});
});

router.post('/register', AuthController.register);
router.post('/login', AuthController.login);
router.post('/test', passport.authenticate('jwt', {session: false}), AuthController.test);

router.post('/forums/create', passport.authenticate('jwt', {session: false}), ForumController.create);
router.get('/forums', ForumController.getAll);
router.get('/forums/:id', ForumController.get);
router.post('/forums/update', passport.authenticate('jwt', {session: false}), ForumController.update);
router.delete('/forums/delete', passport.authenticate('jwt', {session: false}), ForumController.delete);

module.exports = router;

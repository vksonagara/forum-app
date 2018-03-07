const express = require('express');
const router = express.Router();
const AuthController = require('./controllers/AuthController');

router.get('/', (req, res) => {
	res.send({
		message: 'Hello'
	});
});

router.post('/register', AuthController.register);
router.post('/login', AuthController.login);

module.exports = router;

const router = require('express').Router();
const userController = require('../controllers/userController');
const auth = require('../middleware/auth');

router.post('/register', userController.registerUser)

router.post('/login', userController.loginUser)

// auth check
router.get('/verify', userController.verifiedToken)


module.exports = router;
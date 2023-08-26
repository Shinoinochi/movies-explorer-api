const router = require('express').Router();
const { createUser, login } = require('../controllers/users');
const auth = require('../middlewares/auth');
const { validateCreateUser, validateLogin } = require('../utils/validation');

router.post('/signup', validateCreateUser, createUser);

router.post('/signin', validateLogin, login);

router.use(auth);
router.use('/users', require('./users'));
router.use('/movies', require('./movies'));

module.exports = router;

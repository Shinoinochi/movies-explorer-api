const router = require('express').Router();
const { getUser, editUser } = require('../controllers/users');
const { validateEditUser } = require('../utils/validation');

router.get('/me', getUser);
router.patch('/me', validateEditUser, editUser);

module.exports = router;

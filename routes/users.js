const router = require('express').Router();
const controllers = require('../controllers')

router.get('/, controllers.users.index')

router.post('/signup', controllers.users.signup)

router.post('/login', controllers.users.login)

router.get('/logout', controllers.users.logout)


module.exports = router;
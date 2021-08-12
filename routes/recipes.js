const router = require('express').Router();
const controllers = require('../controllers')

router.get('/', controllers.recipes.index)
router.get('/:id', controllers.recipes.show)

router.post('/new', controllers.recipes.create)

router.put('/:id/update', controllers.recipes.update)

router.delete('/:id', controllers.recipes.destroy)

module.exports = router;
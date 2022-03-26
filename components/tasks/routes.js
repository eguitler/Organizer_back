const controller = require('./controller')
const { Router } = require('express')

const router = Router()

router.get('/tasks', controller.all)
router.get('/tasks/:projectCode', controller.filterByProject)
// router.get('/tasks/:code', controller.getProject)
router.delete('/tasks/:code/delete', controller.delete)
router.put('/tasks/:code/edit', controller.edit)
router.post('/tasks/create', controller.create)

module.exports = router

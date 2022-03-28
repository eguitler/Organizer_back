const controller = require('./controller')
const { Router } = require('express')

const router = Router()

router.get('/tasks', controller.all)
router.get('/tasks/:projectId', controller.filterByProject)
// router.get('/tasks/:id', controller.getProject)
router.delete('/tasks/:id/delete', controller.delete)
router.put('/tasks/:id/edit', controller.edit)
router.post('/tasks/create', controller.create)

module.exports = router

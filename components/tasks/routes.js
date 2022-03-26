const controller = require('./controller')
const { Router } = require('express')

const router = Router()

router.get('/tasks', controller.all)
router.get('/tasks/:projectCode', controller.filterByProject)
// router.get('/projects/:id', controller.getProject)
router.post('/tasks/create', controller.create)
// router.delete('/projects/delete', controller.deleteProject)
// router.put('/projects/edit', controller.editProject)

module.exports = router

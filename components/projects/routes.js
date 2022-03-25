const controller = require('./controller')
const { Router } = require('express')

const router = Router()

router.get('/projects', controller.getProjects)
router.get('/projects/:code', controller.getProject)
router.post('/projects/create', controller.createProject)
router.delete('/projects/delete', controller.deleteProject)
router.put('/projects/edit', controller.editProject)

module.exports = router

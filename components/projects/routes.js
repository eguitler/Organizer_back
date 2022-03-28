const projects = require('./controller')
const { Router } = require('express')

const router = Router()

router.get('/projects', projects.all)
router.get('/projects/:id', projects.find)
router.put('/projects/:id/edit', projects.edit)
router.delete('/projects/:id/delete', projects.delete)
router.post('/projects/create', projects.create)

module.exports = router

const projects = require('./controller')
const { Router } = require('express')

const router = Router()

router.get('/projects', projects.all)
router.get('/projects/:code', projects.find)
router.put('/projects/:code/edit', projects.edit)
router.delete('/projects/:code/delete', projects.delete)
router.post('/projects/create', projects.create)

module.exports = router

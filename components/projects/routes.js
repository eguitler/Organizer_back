const controller = require('./controller')
const { Router } = require('express')

const router = Router()

router.get('/projects', controller.getProjects)

module.exports = router

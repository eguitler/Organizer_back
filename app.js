require('dotenv').config()

const express = require('express')
const cors = require('cors')

const logger = require('./middlewares/logger')
const connectDb = require('./services/mongodb')

const projectsRoutes = require('./components/projects/routes')
const tasksRoutes = require('./components/tasks/routes')

const app = express()
connectDb()

/**
 * Middleware to parse objects
 * received through endpoints
 */
app.use(express.json())
app.use(cors())

app.use(logger)

app.use(projectsRoutes)
app.use(tasksRoutes)

app.get('/', (req, res) => {
  res.status(200).send(`<h1>Hello API! we're on ${process.env.NODE_ENV}</h1>`)
})

app.use((req, res) => {
  res.status(404).json({
    error: 'Page not found'
  })
})

module.exports = app

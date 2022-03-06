const mongoose = require('mongoose')

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String }
})

const Project = mongoose.model('Project', projectSchema)

module.exports = Project
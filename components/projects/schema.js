const mongoose = require('mongoose')

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  code: { type: String, length: 2 },
  priority: { type: Number },
  // createdAt: { type: Date },
  tasks: { type: Array }
}, {
  timestamps: true
})

const Project = mongoose.model('Project', projectSchema)

module.exports = Project

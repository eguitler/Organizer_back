const mongoose = require('mongoose')

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  code: {
    type: String,
    minlength: 2,
    maxlength: 6,
    required: true,
    unique: true
  },
  tasks: {
    type: Array,
    required: true
  }
}, {
  timestamps: true
})

const Project = mongoose.model('Project', projectSchema)

module.exports = Project

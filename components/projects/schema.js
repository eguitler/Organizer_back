const mongoose = require('mongoose')
const { Todo, InProgress, Done } = require('../tasksStatus')
const tasksStatusSchema = require('../tasksStatus/schema')

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    default: ''
  },
  code: {
    type: String,
    minlength: 2,
    maxlength: 6,
    required: true,
    unique: true
  },
  tasks: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Task'
  }],
  tasksCount: {
    type: Number,
    required: true,
    default: 0
  },
  tasksStatus: {
    type: [tasksStatusSchema],
    default: [Todo, InProgress, Done]
  }
}, {
  timestamps: true
})

const Project = mongoose.model('Project', projectSchema)

module.exports = Project

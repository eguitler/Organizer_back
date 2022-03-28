const mongoose = require('mongoose')
const { Todo, InProgress, Done } = require('../tasksStatus')
const tasksStatusSchema = require('../tasksStatus/schema')
const shortid = require('shortid')

const projectSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: shortid.generate
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    default: ''
  },
  tasks: [{
    type: String,
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

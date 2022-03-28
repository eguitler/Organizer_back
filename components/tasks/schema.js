const mongoose = require('mongoose')
const { Todo } = require('../tasksStatus')
const tasksStatusSchema = require('../tasksStatus/schema')
const shortid = require('shortid')

const taskSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: shortid.generate
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  priority: {
    type: Number
  },
  createdAt: {
    type: Date
  },
  parent: {
    type: String,
    ref: 'Project'
  },
  subTasks: {
    type: Array,
    required: true
  },
  isSubTask: {
    type: Boolean,
    required: true,
    default: false
  },
  status: {
    type: tasksStatusSchema,
    default: Todo
  }
}, {
  timestamps: true
})

const Task = mongoose.model('Task', taskSchema)

module.exports = Task

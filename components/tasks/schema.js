const mongoose = require('mongoose')
const { Todo } = require('../tasksStatus')
const tasksStatusSchema = require('../tasksStatus/schema')

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  code: {
    type: String,
    // required: true,
    unique: true
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
  projectCode: {
    type: String
  },
  parent: {
    type: mongoose.Schema.Types.ObjectId,
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

const mongoose = require('mongoose')

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  code: { type: String, required: true, unique: true },
  description: { type: String },
  priority: { type: Number },
  createdAt: { type: Date },
  projectCode: { type: String },
  subTasks: { type: Array, required: true },
  isSubTask: { type: Boolean, required: true }
}, {
  timestamps: true
})

const Task = mongoose.model('Task', taskSchema)

module.exports = Task

const mongoose = require('mongoose')

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  priority: { type: Number },
  createdAt: { type: Date },
  parentId: { type: mongoose.ObjectId },
  subTasks: { type: Array },
  isSubTask: { type: Boolean, required: true }
}, {
  timestamps: true
})

const Task = mongoose.model('Task', taskSchema)

module.exports = Task

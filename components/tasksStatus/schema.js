const mongoose = require('mongoose')

const tasksStatusSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  color: {
    type: String,
    required: true
  }
}, {
  timestamps: true
})

module.exports = tasksStatusSchema

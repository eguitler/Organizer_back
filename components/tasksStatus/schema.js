const mongoose = require('mongoose')

const shortid = require('shortid')
const tasksStatusSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: shortid.generate
  },
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

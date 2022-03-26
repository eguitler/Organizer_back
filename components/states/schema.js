const mongoose = require('mongoose')

const stateSchema = new mongoose.Schema({
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

module.exports = stateSchema

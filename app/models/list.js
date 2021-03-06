const mongoose = require('mongoose')
const commentSchema = require('./comment')

const listSchema = new mongoose.Schema({
  item: {
    type: String,
    required: true
  },
  comments: [commentSchema],
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
})

module.exports = mongoose.model('List', listSchema)

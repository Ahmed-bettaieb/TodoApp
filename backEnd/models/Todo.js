const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
  title: String,
  description: String,
  date: String,
  status: String,
  priority: String,
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true }); // 👈 Adds createdAt and updatedAt

module.exports = mongoose.model('Todo', todoSchema);

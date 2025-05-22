const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, unique: true, required: true },
  username: { type: String },
  password: { type: String, required: true }
}, { timestamps: true }); // 👈 This adds createdAt and updatedAt

module.exports = mongoose.model('User', userSchema);

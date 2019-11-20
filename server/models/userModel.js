const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  order_ids: [String],
  manage: Boolean,
  telephone: String,
  verifyCode: String,
})

module.exports = mongoose.model('user', userSchema, 'user');
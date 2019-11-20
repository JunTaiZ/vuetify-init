const mongoose = require('mongoose');
const prodKeySchema = new mongoose.Schema({
  key: String,
  cost: Number
})

module.exports = mongoose.model('prod_key', prodKeySchema, 'prod_key');
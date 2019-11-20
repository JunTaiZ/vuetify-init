const mongoose = require('mongoose');
const productSchema = new mongoose.Schema({
  product_name: String,
  product_key: String,
  cost: Number
})

module.exports = mongoose.model('product', productSchema, 'product');
const mongoose = require('mongoose');

const storeSchema = new mongoose.Schema({
  store_name: String
})

module.exports = mongoose.model('store', storeSchema, 'store');
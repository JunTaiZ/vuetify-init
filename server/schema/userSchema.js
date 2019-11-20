const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: String,
    password: String,
    order_ids: [String],
    manage: Boolean,
    telephone: String,
})

module.exports = userSchema;
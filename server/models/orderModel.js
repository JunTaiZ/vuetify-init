const mongoose = require('mongoose'),
    orderSchema = new mongoose.Schema({
        user_id: String,
        store_id: String,
        product_id: String,
        product_key_id: String,
        order_id: String,
        date: Date,
        status: 0,
        paydate: Date,
        num: Number,
        express_id: String,
        cost: Number,
    })
module.exports = mongoose.model('order', orderSchema, 'order');
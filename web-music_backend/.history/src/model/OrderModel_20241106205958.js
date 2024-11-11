const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
    totalPrice: { type: Number, required: false},
    userId: { 
        type: String, required: true 
     },
     
     isPaid: { type: Boolean, required: false}
        },

    {
        timestamps: true,
    }
)

const Order = mongoose.model('Order',orderSchema);
module.exports = Order;

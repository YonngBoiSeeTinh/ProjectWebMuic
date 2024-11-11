const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
    totalPrice: { type: Number, required: false},
    amount: { type: Number, required: true },
    productId: { type: String, required: true },
    userId: { 
        type: String, required: true 
     },
     color: { type: String, required: true },
     phone: { type: String, required: false },
     cusName: { type: String, required: false },
     address: { type: String, required: false },
   
     accept: { type: Boolean, required: false,default: false},
     isPaid: { type: Boolean, required: false}
        },

    {
        timestamps: true,
    }
)

const Order = mongoose.model('Order',orderSchema);
module.exports = Order;

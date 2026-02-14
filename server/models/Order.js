const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',  // Reference to the User model
        required: true
    },
    restaurant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Restaurant',  // Reference to the Restaurant model
        required: true
    },
    items: [{
        item: {
            type: String,
            required: true
        },
        quantity: {
            type: Number,
            required: true
        },
        price: {
            type: Number,
            required: true
        }
    }],
    totalPrice: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ['Pending', 'Completed', 'Cancelled'],
        default: 'Pending'
    },
    paymentDetails: {
        method: {
            type: String,
            required: true,
            enum: ['Credit Card', 'PayPal', 'Cash']
        },
        transactionId: {
            type: String,
            required: true
        }
    },
},{
    timestamps: true // Automatically manage createdAt and updatedAt timestamps
});

module.exports = mongoose.model('Order', orderSchema);
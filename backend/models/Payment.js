const mongoose = require('mongoose');

const PaymentSchema = new mongoose.Schema({
    studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
    amount: { type: Number, required: true },
    currency: { type: String, required: true },
    provider: { type: String, enum: ['flutterwave', 'stripe', 'paypal'], required: true },
    transactionId: { type: String },
    status: { type: String, enum: ['pending', 'successful', 'failed'], default: 'pending' }
}, { timestamps: true });

module.exports = mongoose.model('Payment', PaymentSchema);

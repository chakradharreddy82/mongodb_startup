const mongoose = require('mongoose');

const QuoteSchema = new mongoose.Schema({
    name: String,
    email: String,
    service: String,    // Changed from 'subject' to 'service'
    message: String,
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Quote', QuoteSchema);

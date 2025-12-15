const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    number: {
        type: String,
        required: true,
        match: [/^\d{10}$/, 'Please enter a valid 10-digit phone number']
    },
    rating: {
        type: Number,
        required: true,
        min: [1, 'Rating must be at least 1'],
        max: [5, 'Rating cannot exceed 5']
    },
    reviewText: {
        type: String,
        required: true,
        trim: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Review', reviewSchema);
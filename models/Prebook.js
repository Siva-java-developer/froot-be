const mongoose = require('mongoose');

const prebookSchema = new mongoose.Schema({
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
    boxType: {
        type: String,
        required: true,
        trim: true
    },
    date: {
        type: Date,
        required: true
    },
    outletId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Outlet',
        required: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Prebook', prebookSchema);
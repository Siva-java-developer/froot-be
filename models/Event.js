const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    feedback: {
        type: String,
        required: false
    },
    greetings: {
        type: String,
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model("Event", eventSchema);
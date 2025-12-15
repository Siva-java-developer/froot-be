const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
    },
    mobileNumber: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['superadmin', 'admin'],
        default: 'admin'
    },
    outletId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Outlet',
        required: function() {
            return this.role === 'admin';
        }
    },
    status: {
        type: Boolean,
        default: true
    }
}, { timestamps: true })

module.exports = mongoose.model("User", userSchema);
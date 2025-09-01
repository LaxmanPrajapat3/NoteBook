const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    googleId: {
        type: String,
        unique: true,
        sparse: true, // Allows multiple null values, but unique if a value exists
    },
    otp: String,
    otpExpires: Date,
}, { timestamps: true });

// This line is critical! It creates the model and exports it.
module.exports = mongoose.model('User', UserSchema);

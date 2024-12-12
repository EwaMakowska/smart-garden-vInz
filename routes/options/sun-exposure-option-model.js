const mongoose = require('mongoose');

const SunExposeSchema = new mongoose.Schema({
    label: {
        type: String,
        required: true,
        unique: true
    }
});

module.exports = mongoose.model('SunExposeOption', SunExposeSchema, 'sun-exposure-options');
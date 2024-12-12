const mongoose = require('mongoose');

const DevelopmentLevelSchema = new mongoose.Schema({
    label: {
        type: String,
        required: true,
        unique: true
    },
    icon: {
        type: String,
        required: true,
        unique: true
    }
});

module.exports = mongoose.model('DevelopmentLevelSchema', DevelopmentLevelSchema, 'development-level-options');
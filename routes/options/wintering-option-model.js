const mongoose = require('mongoose');

const WinteringOptionSchema = new mongoose.Schema({
    label: {
        type: String,
        required: true,
        unique: true
    }
});

module.exports = mongoose.model('WinteringOption', WinteringOptionSchema, 'wintering-options');
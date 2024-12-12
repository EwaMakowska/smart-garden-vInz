const mongoose = require('mongoose');

const JournalPostSchema = new mongoose.Schema({
    user_id: String,
    createDate: {
        type: Date,
        default: Date.now,
        required: true
    },
    text: String
});

module.exports = mongoose.model('JournalPostSchema', JournalPostSchema, 'journal');
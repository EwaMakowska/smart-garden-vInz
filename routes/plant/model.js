const mongoose = require('mongoose');

const PlantSchema = new mongoose.Schema({
    user_id: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true,
        unique: true
    },
    createdDate: {
        type: Date,
        default: Date.now
    },
    endDate: {
        type: Date,
        default: null
    },
    species: {
        type: String,
        required: true
    },
    developmentLevel: {
        type: Number,
        default: null
    }
});

module.exports = mongoose.model('Plant', PlantSchema);
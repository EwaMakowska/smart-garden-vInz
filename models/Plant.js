const mongoose = require('mongoose');

const PlantSchema = new mongoose.Schema({
    uuid: String,
    name: String,
    date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Plant', PlantSchema);
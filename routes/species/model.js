const mongoose = require('mongoose');

const RecommendedTemperatureSchema = new mongoose.Schema({
    min: {
        type: Number,
        required: true
    },
    max: {
        type: Number,
        required: true
    }
})

const WinteringSchema = new mongoose.Schema({
    winteringOption: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'WinteringOption',
    },
    dateFrom: {
        type: Date,
        default: null
    },
    dateTo: {
        type: Date,
        default: null
    }
})

const WateringSchema = new mongoose.Schema({
    liters: {
        type: Number,
        required: true
    },
    period: {
        type: Number,
        required: true
    },
    wintering: {
        type: WinteringSchema,
        default: null
    }
})

const SpeciesSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    createdDate: {
        type: Date,
        default: Date.now,
        required: true
    },
    originRegion: {
        type: String,
        required: true,
    },
    sunExposureOption: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'SunExposeOption',
        required: true
    },
    recommendedTemperature: {
        type: RecommendedTemperatureSchema,
        default: {}
    },
    watering: {
        type: WateringSchema,
        default: null
    },
    overWateringSymptoms: {
        type: Array,
        default: [],
        required: true
    },
    dryingOutSymptoms: {
        type: Array,
        default: [],
        required: true
    }
});

module.exports = mongoose.model('Species', SpeciesSchema);
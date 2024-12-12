const express = require('express');
const route = express.Router();
const Species = require('./model.js');
const handleError = require("../handleError");
const formDate = require("../../utils/formatDateTime")
const mongoose = require('mongoose')

route.get('/', async (req, res) => {
    try {
        const item = await Species.find();
        res.json(item);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

route.get('/names-list', async (req, res) => {
    try {
        const item = await Species.find({}, { _id: 1, name: 1 });
        res.json(item);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

route.get('/item/:id', async (req, res) => {
    try {
        const item = await Species.findById(req.params.id)
            .populate('sunExposureOption')
            .populate('watering.wintering.winteringOption')
        res.json(item);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

route.post('/save-species', async function(req, res, next) {
    const speciesData = {
        name: req.body.species.name,
        originRegion: req.body.species.originRegion,
        sunExposureOption: req.body.species.sunExposureOption._id,
        recommendedTemperature: req.body.species.recommendedTemperature,
        watering: {
            liters: req.body.species.watering.liters,
            period: req.body.species.watering.period,
            wintering: {
                dateFrom: formDate.saveDateTime(req.body.species.watering.wintering.dateFrom),
                dateTo: formDate.saveDateTime(req.body.species.watering.wintering.dateTo),
                winteringOption: req.body.species.watering.wintering.winteringOption._id
            }
        },
        overWateringSymptoms: req.body.species.overWateringSymptoms,
        dryingOutSymptoms: req.body.species.dryingOutSymptoms
    };

    try {
        const item = await Species.create(speciesData);
        res.status(201).send('Zapisano pomyslnie');
    } catch (error) {
        if (error instanceof mongoose.Error.ValidationError) {
            res.status(400).send(handleError(error))
        } else {
            res.status(500).send(handleError(error))
        }
    }
});

route.put('/update-species/:id', async function(req, res, next) {
    const speciesData = {
        name: req.body.species.name,
        originRegion: req.body.species.originRegion,
        sunExposureOption: req.body.species.sunExposureOption,
        recommendedTemperature: req.body.species.recommendedTemperature,
        watering: {
            liters: req.body.species.watering.liters,
            period: req.body.species.watering.period,
            wintering: {
                dateFrom: formDate.saveDateTime(req.body.species.watering.wintering.dateFrom),
                dateTo: formDate.saveDateTime(req.body.species.watering.wintering.dateTo),
                winteringOption: req.body.species.watering.wintering.winteringOption
            }
        },
        overWateringSymptoms: req.body.species.overWateringSymptoms,
        dryingOutSymptoms: req.body.species.dryingOutSymptoms
    };

    try {
        const item = await Species.findByIdAndUpdate(req.params.id, speciesData, { new: true });
        res.status(201).send('Zaktualizowano pomyslnie');
    } catch (error) {
        if (error instanceof mongoose.Error.ValidationError) {
            res.status(400).send(handleError(error))
        } else {
            res.status(500).send(handleError(error))
        }
    }
});

module.exports = route;
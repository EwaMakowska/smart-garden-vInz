const express = require('express');
const route = express.Router();
const Plant = require('./model.js');
const mongoose = require("mongoose");
const handleError = require("../handleError");


route.get('/', async (req, res) => {
    try {
        const plants = await Plant.find();
        res.json(plants);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

route.get('/item/:id', async (req, res) => {
    let _id = req.params.id
    try {
        const item = await Plant.findById(_id)
        res.json(item);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

route.post('/save-plant', async function(req, res, next) {
    console.log("Received Plant save-plant:", req.body);

    const plantData = {
        user_id: req.body.plant.user_id,
        name: req.body.plant.name,
        species: req.body.plant.species,
        developmentLevel: req.body.plant.developmentLevel
    };

    try {
        const item = await Plant.create(plantData);
        res.status(201).send({ message: 'Zapisano pomyslnie', id: item._id });
    } catch (error) {
        if (error instanceof mongoose.Error.ValidationError) {
            res.status(400).send(handleError(error))
        } else {
            res.status(500).send(handleError(error))
        }
    }
});

route.put('/update-plant/:id', async function(req, res) {
    const saveItem = {
        user_id: req.body.plant.user_id,
        name: req.body.plant.name,
        endDate: null,
        species: req.body.plant.species,
        developmentLevel: req.body.plant.developmentLevel
    };

    try {
        const item = await Plant.findByIdAndUpdate(req.params.id, saveItem, { new: true });
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
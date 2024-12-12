const express = require('express');
const route = express.Router();
const SunExposeOption = require('./sun-exposure-option-model');
const WinteringOption = require('./wintering-option-model')
const DevelopmentLevelOption = require('./development-level-option')

route.get('/sun-exposure-options', async (req, res) => {
    try {
        const items = await SunExposeOption.find();
        res.json(items);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

route.get('/wintering-options', async (req, res) => {
    try {
        const items = await WinteringOption.find();
        res.json(items);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

route.get('/development-level-options', async (req, res) => {
    try {
        const items = await DevelopmentLevelOption.find();
        res.json(items)
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
})

module.exports = route;
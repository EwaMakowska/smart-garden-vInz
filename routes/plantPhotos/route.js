const express = require("express");
const route = express.Router();
const mongoose = require('mongoose');
const bodyParser = require("body-parser");
const handleError = require("../handleError");

route.get('/items/:user_id/:plant_id', async (req, res) => {

    let user_id = req.params.user_id
    let plant_id = req.params.plant_id

    console.log("user id", user_id)
    console.log("plant id", plant_id)

    const GetUserPlantPhotosSchema = new mongoose.Schema({
        file: { type: Buffer, required: true },
        user_id: { type: String, required: true },
        plant_id: {type: String, required: true},
        isMain: {type: Boolean, default: false}
    });
    const GetUserPlantPhotos = mongoose.model('GetUserPlantPhoto', GetUserPlantPhotosSchema);

    try {
        const items = await GetUserPlantPhotos.find({ user_id: user_id, plant_id: plant_id });
        res.json(items);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


route.post('/save-plant-photo', bodyParser.json(), async (req, res) => {
    let base64Image = req.body.plantPhoto.file;
    let bufferImage = Buffer.from(base64Image, 'base64');

    const PlantPhotoSchema = new mongoose.Schema({
        file: { type: bufferImage, required: true },
        user_id: { type: String, required: true },
        plant_id: {type: String, required: true},
        isMain: {type: Boolean, default: false}
    });
    const PlantPhoto = mongoose.model('PlantPhoto', PlantPhotoSchema);


    const newPlantPhoto = {
        file: req.body.plantPhoto.file,
        user_id: req.body.plantPhoto.user_id,
        plant_id: req.body.plantPhoto._id,
        isMain: req.body.plantPhoto.isMain
    }
        try {
                const item = await PlantPhoto.create(newPlantPhoto);
                res.status(201).send('Zapisano pomyslnie');
        } catch (error) {
            if (error instanceof mongoose.Error.ValidationError) {
                res.status(400).send(handleError(error))
            } else {
                res.status(500).send(handleError(error))
            }
        }
});

route.use(function(err, req, res) {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

module.exports = route;
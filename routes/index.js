const express = require('express');
const router = express.Router();
const options = require('./options/route')
const species = require('./species/route')
const plants = require('./plant/route');
const plantPhotos = require('./plantPhotos/route');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.use('/options', options);
router.use('/species', species);
router.use('/plants', plants);
router.use('/plantPhotos', plantPhotos);

module.exports = router;

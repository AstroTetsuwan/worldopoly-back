const router = require('express').Router();

const fromCoords = require('./fromCoords');

router.get('/from-coords', fromCoords);

module.exports = router;
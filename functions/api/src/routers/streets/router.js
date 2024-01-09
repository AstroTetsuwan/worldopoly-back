const router = require('express').Router();

router.get('/from-coords', require('./from-coords'));

module.exports = router;
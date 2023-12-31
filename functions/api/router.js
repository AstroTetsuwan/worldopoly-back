const router = require('express').Router();
const firebaseApp = require('../firebaseApp');

const streetsRouter = require('./streets/router');

router.get('/', (req, res) => {
    res.send("You did it! 🥳");
});

router.use('/streets', streetsRouter);

module.exports = router;
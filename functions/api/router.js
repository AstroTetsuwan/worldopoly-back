const router = require('express').Router();
const streetsRouter = require('./src/routers/streets/router');

router.get('/', (req, res) => {
    res.send("You did it! 🥳");
});

router.use('/streets', streetsRouter);

router.use('/test', async (req, res) => {
    res.send("OK");
});

module.exports = router;
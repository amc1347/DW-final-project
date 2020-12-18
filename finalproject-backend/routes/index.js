const express = require('express')
const router = express.Router();

const samplePoetJSON = [{
    poemID: '',
    name: "Alison",
    title: "Stupid ass student",
    nameID: '',
    poem: "Ollie"
}];

router.get('/', (req, res) => res.send(samplePoetJSON));

module.exports = router;
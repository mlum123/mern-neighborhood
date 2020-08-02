const express = require('express');
const router = express.Router();

// Need Model
const Need = require('../../models/Need');
const { restart } = require('nodemon');

// @route  GET api/needs
// @desc   Get All Needs
// @access Public
router.get('/', (req, res) => {
    Need.find()
        .sort({ date: -1 })
        .then(needs => res.json(needs))
});

// @route  POST api/needs
// @desc   Create A Need
// @access Public
router.post('/', (req, res) => {
    const newNeed = new Need({
        name: req.body.name
    });

    newNeed.save().then(need => res.json(need));
});

// @route  DELETE api/needs/:id
// @desc   Delete A Need
// @access Public
router.delete('/:id', (req, res) => {
    Need.findById(req.params.id)
        .then(need => need.remove().then(() => res.json({success: true})))
        .catch(err => res.status(404).json({success: false}));
});

module.exports = router;
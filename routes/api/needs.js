const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

// Need Model
const Need = require('../../models/Need');

const { restart } = require('nodemon');

// User Model
const User = require('../../models/User');

// @route  GET api/needs
// @desc   Get All Needs
// @access Private
router.get('/', auth, (req, res) => {
    Need.find()
        .sort({ date: -1 })
        .then(needs => res.json(needs))
});

// @route  POST api/needs
// @desc   Create A Need
// @access Private
router.post('/', auth, (req, res) => {
    const newNeed = new Need({
        name: req.body.name,
        userId: req.user.id
    });

    newNeed.save().then(need => res.json(need));
});

// @route  DELETE api/needs/:id
// @desc   Delete A Need
// @access Private
router.delete('/:id', auth, (req, res) => {
    Need.findById(req.params.id)
        .then(need => need.remove().then(() => res.json({success: true})))
        .catch(err => res.status(404).json({success: false}));
});

module.exports = router;
const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');

// User Model
const User = require('../../models/User');

// @route  POST api/users
// @desc   Register new user
// @access Public
router.post('/', (req, res) => {
    const { name, email, password, neighborhood } = req.body;

    // Simple validation
    if (!name || !email || !password || !neighborhood) {
        return res.status(400).json({ msg: 'Please enter all fields' });
    }

    // Check for existing user
    User.findOne( { email })
        .then(user => {
            if (user) return res.status(400).json({ msg: 'User already exists' });

            const newUser = new User({
                name,
                email,
                password,
                neighborhood
            });

            // Create salt & hash
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) throw err;
                    newUser.password = hash;
                    newUser.save()
                        .then(user => {
                            jwt.sign(
                                { id: user.id },
                                config.get('jwtSecret'),
                                { expiresIn: 3600 },
                                (err, token) => {
                                    if (err) throw err;
                                    res.json({
                                        token,
                                        user: {
                                            id: user.id,
                                            name: user.name,
                                            email: user.email,
                                            neighborhood: user.neighborhood
                                        }
                                    })
                                }
                            );
                        });
                })
            })
        })
});

// @route  GET api/users
// @desc   Get Users
// @access Public
router.get('/', (req, res) => {
    User.find()
        .sort({ register_date: -1 })
        .then(users => res.json(users))
});

module.exports = router;
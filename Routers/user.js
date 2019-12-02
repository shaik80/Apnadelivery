const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const gravatar = require('gravatar');
const jwt = require('jsonwebtoken')
const {
    check,
    validationResult
} = require('express-validator')
const User = mongoose.model('User');

// @route       POST api/register
// @desc        Register User
// @access      Public
router.post('/register', [
    check('name', 'Name is required')
    .not()
    .isEmpty(),
    check('email', 'Please enter valid email')
    .isEmail(),
    check('password', 'please enter a password with 6 or more character')
    .isLength({
        min: 6
    })
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        })
    }

    const {
        name,
        email,
        password
    } = req.body;

    try {
        // see if user exists
        let user = await User.findOne({
            email
        });

        if (user) {
            res.status(400)
                .json({
                    errors: [{
                        msg: 'User already exists'
                    }]
                })
        }

        //get user gravtar

        const avatar = gravatar.url(email, {
            s: '200',
            r: 'pg',
            d: 'mm'
        })

        user = new User({
            name,
            email,
            avatar,
            password
        })

        //Encrypt password

        const salt = await bcrypt.genSalt(10);

        user.password = await bcrypt.hash(password, salt);

        await user.save();


        //Return jsonwebtoken

        const payload = {
            user: {
                id: user.id
            }
        }

        jwt.sign(payload, 'mysecrettoken', {
                expiresIn: 36000
            },
            (err, token) => {
                if (err) throw err;
                res.json({
                    token
                });
            });

    } catch (err) {
        res.status(500).send('Server error');

    }
});


// router.get('/loder', (req, res) => res.send("loader"));
// router.get('/homepage', (req, res) => res.send("homepage"));


module.exports = router;
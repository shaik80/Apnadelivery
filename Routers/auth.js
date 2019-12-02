const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const auth = require('../middlware/auth');
const bcrypt = require('bcryptjs');
const gravatar = require('gravatar');
const jwt = require('jsonwebtoken');
const {
    check,
    validationResult
} = require('express-validator')
const User = mongoose.model('User');

// @route       POST api/auth
// @desc        test route
// @access      Public

router.get('/',auth,async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error')
    }
})

// @route       POST api/auth
// @desc        Login User
// @access      Public
router.post('/login', [
    check('email', 'Please enter valid email')
    .isEmail(),
    check('password', 'password is required')
    .exists()
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        })
    }

    const {
        email,
        password
    } = req.body;

    try {
        // see if user exists
        let user = await User.findOne({
            email
        });

        if (!user) {
            res.status(400)
                .json({
                    errors: [{
                        msg: 'Invalid credentials'
                    }]
                })
        }

        // Check password

        const isMatch = await bcrypt.compare(password,user.password);

        if(!isMatch){
            return res
            .status(400)
            .json({errors:[{msg:'Invalid Credentials'}]})
        }
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

module.exports = router;
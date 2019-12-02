const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Path = require('../models/Path.model');
// @route       POST api/path
// @desc        Register User
// @access      Public
router.post('/', async (req, res,next) => {
    Path.create(req.body).then(
        function(v){
            res.send(v);
        }
    )
    .catch(next)
});

router.get('/',  (req, res) => {
    Path.aggregate().near({
        near: {
         'type': 'Point',
         'coordinates': [parseFloat(req.query.lng), parseFloat(req.query.lat)]
        },
        maxDistance: 900,
        spherical: true,
        distanceField: "dis"
       }).then(function(v){
        res.send(v)
    })
});



module.exports = router;
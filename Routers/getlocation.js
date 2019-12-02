const express = require('express');
const router = express.Router();






// @route       POST api/latlng
// @desc        test route
// @access      Public

router.get('/', (req, res) => {
    try {
        navigator.geolocation.getCurrentPosition((v)=>{
            res.json({lat:v.coords.latitude,lng:v.coords.longitude});
        })

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error')
    }
})



module.exports = router;
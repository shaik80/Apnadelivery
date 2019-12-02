const mongoose = require('mongoose');

//connect db 
const uri = process.env.MONGO_DB;

mongoose.connect(
    uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    }, (err) => {
        if (!err) {
            console.log("db connection sucessed")
        } else {
            console.log("db connection error " + err)
        }
    })
require('../models/User.model')
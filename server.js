require('dotenv').config();
require('./config/db');
const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const path = require('path');
const cors = require('cors');
const session = require('express-session');
const bodyparser = require('body-parser');
const passport = require('passport');
const auth = require('./Routers/auth')
const user = require('./Routers/user')
const PathLocation = require('./Routers/path')
const LanLat = require('./Routers/getlocation')

app.use(express.static('public'));

app.use(bodyparser.urlencoded({
    extended: true
}));

app.use(cors());
app.use(bodyparser.json());

app.set('views', path.join(__dirname, './views'))

app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());


app.listen(port, () => console.log('server started on port 5000.....'));

app.use('/api/auth', auth);
app.use('/api/auth', user);
app.use('/api/path', PathLocation);
app.use('/api/lanlat', LanLat);
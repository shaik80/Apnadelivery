const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
    //GET token from hader
    const token = req.header('x-auth-token');

    //check if not token
    if (!token) {
        return res.status(401).json({ msg: 'no token authorization denied'})
    }

    // Verify token
    try {
        const decoded = jwt.verify(token , "mysecrettoken")
        req.user = decoded.user;
        next();
    } catch (err) {
        res.status(401).json( {msg: 'Token is not valid'})
    }
}
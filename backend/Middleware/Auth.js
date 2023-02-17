const jwt = require('jsonwebtoken');
const User = require('../Model/User.Model');

module.exports = (req, res, next) => {
    const { authorization } = req.headers;

    if (!authorization) {
        return res.status(401).json({ error: "You must be Login first!" })
    }

    //Authorization
    const token = authorization.replace("Bearer ", "")
    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, payload) => {
        if (err) {
            res.status(401).json({ error: 'You must Login first!' })
        }
        const { _id } = payload;
        User.findById(_id).then(result => {
            req.user = result;
            next();
        });
    });
}
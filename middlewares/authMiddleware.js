const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
// const User = require('../models/user')

const protect = asyncHandler(async (req, res, next) => {
    let token
    console.log("hit");
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1]
            console.log(token);
            const verified = jwt.verify(token, process.env.SECRET_KEY);
            req.user = verified
            next();
        } catch (error) {
            console.log(error)
            res.status(401)
            throw new Error('Not authorized')
        }
    }

    if (!token) {
        res.status(401)
        throw new Error('Not authorized, no token')
    }
})

module.exports =  protect; 
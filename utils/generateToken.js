const jwt = require('jsonwebtoken');

const generateToken = (id) => {
    return jwt.sign({id}, 'proccess.env.SECRET_KEY', {
        expiresIn: '30d',
    })
}

module.exports = generateToken;
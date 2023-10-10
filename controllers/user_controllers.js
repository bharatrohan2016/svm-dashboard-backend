const User = require('../models/user');
const generateToken = require('../utils/generateToken');
const { default: mongoose } = require('mongoose');
const bcrypt = require('bcryptjs');

module.exports.signUp = async (req, res) => {
    try {
        const exist = await User.findOne({email: req.body.email})
        if (exist) {
            return res.status(401).json({ message: 'User already registered'});
        }
        const user = req.body;
        const newUser = new User(user);
        await newUser.save();
        res.status(200).json({
            message: user
            
        });
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}


module.exports.signIn = async (req, res) => {
    console.log(req.body);
    try {
        let user = await User.findOne({email:req.body.email})
        if (user) {
            let isMatch = await bcrypt.compare(req.body.password, user.password);
            if (isMatch) {
                return res.status(200).json({
                    id: user._id,
                    user: 'user',
                    token: generateToken(user._id)
                })
            }else{
                return res.status(401).json('Invalid Login')
            }
        }
    } catch (error) {
        res.status(500).json('Error ', error.message);
    }
}
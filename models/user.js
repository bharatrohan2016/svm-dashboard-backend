const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')
const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

// Hasing password

userSchema.pre('save', async function(next) {
    if (this.isModified('password')) {
        this.password = bcrypt.hashSync(this.password, 12);
    }
    next();
})


const User = mongoose.model('User', userSchema);
module.exports = User;
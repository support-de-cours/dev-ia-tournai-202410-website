const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// User data Schema
// --
const UserSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true,
        unique: false
    },
    lastname: {
        type: String,
        required: true,
        unique: false
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function(v) {
                return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(v);
            },
            message: props => `${props.value} n'est pas une adresse email valide!`
        }
    },
    password: {
        type: String,
        required: true
    }
});


// Schema Event Listener
// --
UserSchema.pre('save', async function(next){

    if (!this.isModified('password')) {
        return next();
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash( this.password, salt );

    next();
});


// User Model
// --
const User = mongoose.model('User', UserSchema);
module.exports = User;
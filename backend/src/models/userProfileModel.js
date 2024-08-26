// when user register we also create user's profile at the same time (model)

const mongoose = require ('mongoose');

const userProfileSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId, /** mongodbCompass -> user's -> id */
        ref: 'User',
        required: true
    },

    bio: {
        type: String,
        maxlength: 500
    },

    profileImage:{
        type: String
    },

    skinType: {
        type: String,
    },

    skinHistory: {
        type: String,
    }
});

module.exports = mongoose.model('Profile', userProfileSchema );
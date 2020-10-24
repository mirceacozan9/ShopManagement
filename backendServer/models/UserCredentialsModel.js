var mongoose = require('mongoose');

var UserCredentialsSchema = new mongoose.Schema({

    Firstname: {
        type: String,
        required: true
    },

    Lastname: {
        type: String, 
        required: true
    },

    User_Id: {
        type: Number,
        required: true,
        unique: true
    },

    Password: {
        type: String,
        required: true
    }

});

module.exports = mongoose.model('User Credentials', UserCredentialsSchema);
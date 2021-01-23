var mongoose = require('mongoose');

var ShopInventorySchema = new mongoose.Schema({

    Barcode: {
        type: Number,
        required: true,
        unique: true
    },

    Name: {
        type: String,
        required: true
    },

    Quantity: {
        type: Number, 
        required: true
    },

    Price: {
        type: Number,
        required: true
    }
/*
    Expiration_Date: {
        type: Date,
        required: true
    }
*/
});

module.exports = mongoose.model('Shop Inventory', ShopInventorySchema);
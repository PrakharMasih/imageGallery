const mongoose = require("mongoose");

const imageSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    imageName: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String
    }
},
    {
        timestamps: true,
    });

module.exports = mongoose.model('Image', imageSchema);
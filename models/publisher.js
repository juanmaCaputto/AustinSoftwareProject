const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PublisherSchema = new Schema({
    name:{
        type: String,
        required: [true, 'Name field is required']
    },

    description:{
        type: String,
        required: [true, 'Description field is required']
    },

    adPrice:{
        type: String,
        required: [true, 'Ad price field is required']
    },

    currency:{
        type: String,
        required: [true, 'Currency field is required']
    },

    address:{
        type: String,
        required: [true, 'Address field is required']
    },

    phone:{
        type: String,
        required: [true, 'Phone field is required']
    },
});

const Publisher = mongoose.model('publisher', PublisherSchema);

module.exports = Publisher;
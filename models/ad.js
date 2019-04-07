const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AdSchema = new Schema({
    businessId:{
        type: String
    },

    publisherId:{
        type: String
    },

    postPlace:{
        type: String,
        required: false
    },

    title:{
        type: String,
        required: false
    },

    description:{
        type: String,
        required: false
    },

    startDate:{
        type: String,
        required: false
    },

    endDate:{
        type: String,
        required: false
    },

    URL:{
        type: String,
        required: [true, 'Pdf URL field is required']
    },

    state:{
        type: String,
        default: "Requested"
    }

});

const Ad = mongoose.model('ad', AdSchema);

module.exports = Ad;
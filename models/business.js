const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BusinessSchema = new Schema({
    name:{
        type: String,
        required: [true, 'Name field is required']
    },

    description:{
        type: String,
        required: [true, 'Description field is required']
    },

    city:{
        type: String,
        required: [true, 'City field is required']
    },

    state:{
        type: String,
        required: [true, 'State field is required']
    },

    country:{
        type: String,
        required: [true, 'Country field is required']
    },

    address:{
        type: String,
        required: [true, 'Address field is required']
    },

    phone:{
        type: String,
        required: [true, 'Phone field is required']
    },

    businessURL:{
        type: String,
        required: [true, 'URL field is required']
    }

});

const Business = mongoose.model('business', BusinessSchema);

module.exports = Business;


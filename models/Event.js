

// require mongoose
const mongoose = require('mongoose');

// require the time model
const Time = require('./Time');

// define the model schema
const EventSchema = mongoose.Schema({

    beginningTime:{
        type: Time
    },
    endingTime:{
        type: Time
    },
    eventDetails:{
        type: String
    },
    eventLocation:{
        type: String
    }
});


// exprot the model
module.exports = mongoose.model('events' , EventSchema);



// require mongoose
const mongoose = require('mongoose');

// define the time schema
const TimeSchema = mongoose.Schema({

    hour:{
        type: Number
    },
    minute:{
        type: Number
    },
    timeFormula:{
        type: String
    }

});

// export the model
module.exports = mongoose.model('time' , TimeSchema);
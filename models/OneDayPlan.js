

// require mongoose
const mongoose = require('mongoose');
// require the event model
const Event = require('./Event');


// define the model schema
const OneDayPlanSchema = mongoose.Schema({
    dayDate:{
        type: Date
    },
    events:[{
        type: Event
    }]

});


// export the model
module.exports = mongoose.model('onedayplan' , );


// require mongoose
const mongoose = require('mongoose');
// require OneDayPlan model
const OneDayPlan = require('./OneDayPlan');

// define the model schema
const detailsSchema = mongoose.Schema({

    planEvents:[{
        type: OneDayPlan
    }]

});


// export the model
module.exports = mongoose.model('travelplanDetails' , detailsSchema);
/**
 * 
 *  Travel Plan model 
 *  
 * 
 */

// require mongoose
const mongoose = require('mongoose');

// require the TravelDestination enum
const TravelDestination = require('../enums/TravelDestination');
// require the uesr model
const User = require('../models/User');


// define the model schema
const travelPlanSchema = mongoose.schema({
    travelName:{
        type: String,
        required: true
    },
    travelDestination:[{
        type: TravelDestination,
        required: true
    }],
    travelID:{
        type: Number,
        required: true
    },
    travelSummary:{
        type: String,
        required: true
    },
    travelDate:{
        type: Date,
        required: true
    },
    travelDuration:{
        type: Number,
        required: true
    },
    travelDetails:{

    },
    travelCost:{
        type: Number,
        required: true
    },
    passengersList:[{
       //  type: User,
    }]

});

// export the model
module.exports = mongoose.model('travelPlans' , travelPlanSchema);










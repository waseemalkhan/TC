/**
 * 
 *  User model
 *  
 * 
 */

// require mongoose
const mongoose = require('mongoose');

// define the user schema 
const UserSchema = mongoose.Schema({

    fullName:{
        type : String,
        required : true
    },
    username:{
        type : String,
        required : true
    },
    email:{
        type : String,
        required : true
    },
    password:{
        type : String,
        required : true
    },
    country:{
        type : String,
        required : true
    },
    gender:{
        type : String,
        required : true
    }

});


// export the user schema
module.exports = mongoose.model('users' , UserSchema);
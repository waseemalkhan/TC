/**
 *
 *  Home routes file
 *
 *
 * */


// require express
const express = require('express');
// require the router of express
const router = express.Router();
// require bycryptjs
const bcrypt = require('bcryptjs');

// require the user model
const User = require('../../models/User');

// require passport
const passport = require('passport');
// require passport - local strategy
const localStrategy = require('passport-local').Strategy;


/**
 *
 *  The main route, used to render the views in the home page
 *
 * */
router.get('/', (req, res) => {
    res.render('home/index');
});


/**
 *
 *  The sign-up route, used to render the view of the sign-up page
 *
 * */
router.get('/signup', (req, res) => {
    res.render('home/signup');
});

/**
 *
 *  The sign-in route, used to render the view of the sign-in page
 *
 * */
router.get('/signin', (req, res) => {
    res.render('home/signin');
});

/**
 * 
 *  The about route, used to show information about this application to the user
 * 
 */
router.get('/about', (req, res) => {
    res.render('home/about');
});

// passport settings
passport.use(new localStrategy({usernameField : 'username'} , (username , password , done) => {
    User.findOne({username : username}).then(user => {
        if(!user) return done(null , false , {message : 'No user found !'});

        bcrypt.compare(password , user.password , (err , matched) => {
            if(err) return err;

            if(matched){    
                return done(null , user);
            }else{
                return done(null , false , {message : 'Incorrect password !'});
            }

        });
    });
}));

// serialize user
passport.serializeUser(function(user , done){
    done(null , user.id);
});

// deserialize user
passport.deserializeUser(function(id , done){
    User.findById(id , function(err , user){
        done(err , user);
    });
});


// sign-in auhtentication
router.post('/signin' , (req , res , next) => {
    passport.authenticate('local' , {
        successRedirect: '/',
        failureRedirect: 'signin',
        failureFlash: true // is it working ? TODO
    })(req , res , next);
});




/**
 * 
 *  get the data from the registration page 
 * 
 */
router.post('/signup', (req, res) => {

    // validation 
    let errors = [];

    // if the full name field was empty
    if (!req.body.fullName) {
        errors.push({ message: 'Full name field can not be empty !' });
    }
    if (!req.body.username) {
        errors.push({ message: 'Username field can not be empty !' });
    }
    if (!req.body.country) {
        errors.push({ message: 'Country field can not be empty' });
    }
    if (!req.body.gender) {
        errors.push({ message: 'Gender field can not be empty' });
    }
    if (!req.body.email) {
        errors.push({ message: 'E-mail field can not be empty !' });
    }
    if (!req.body.password) {
        errors.push({ message: 'Password field can not be empty !' });
    }
    if (!req.body.conpassword) {
        errors.push({ message: 'Confirmation Password field can not be empty !' });
    }
    if (req.body.password !== req.body.conpassword) {
        errors.push({ message: 'Passwords did not match !' });
    }


    if (errors.length > 0) {
        res.render('home/signup' , {errors : errors});

    } else { // everything went okay 

        User.findOne({ email: req.body.email }).then(user => {
            if (!user) {
                 
                // to store 'male' or 'female' instead of 'on' or 'off'
                let gender;
                if(req.body.gender.value === 'male'){
                    gender = "male";
                }else{
                    gender = "female";
                }

                // create a new user
                const newUser = new User({
                    fullName: req.body.fullName,
                    username: req.body.username,
                    country: req.body.country,
                    email: req.body.email,
                    password: req.body.password,
                    gender: gender
                });

                // hashing the password 
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        newUser.password = hash;
                        // save the user
                        newUser.save()
                            .then(savedUser => {
                                req.flash('success_message', 'You have registered successfully !');
                                res.redirect('/signin');
                            });
                    });
                });
            }else{
                req.flash('error_message' , 'This email is already registered !');
                res.redirect('/signin');
            }


        });

    }

});


/**
 * 
 *  sign-out functionality
 * 
 */
router.get('/signout' , (req ,res) => {
    req.logout();
    res.redirect('/signin'); 
});



// export the routes
module.exports = router;

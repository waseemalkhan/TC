/**
 *
 *  The entry point of the Node JS application
 *  Travel Consultant System
 *  version : 1.0
 *  documentation writer : Mohammad Mazen Al-Olaby
 *  ==============================================
 *  Date : 1-1-2020
 *
 * */

// require express
const express = require('express');
const app = express();

// require handlebars
const exphbs = require('express-handlebars');

// require the path module
const path = require('path');

// require body-parser
const bodyParser = require('body-parser');

// use the body-parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// require session
const session = require('express-session');
const flash = require('connect-flash');

// get the db config
const { mongoDBUrl } = require('./config/db');
// require mongoose
const mongoose = require('mongoose');

// require passport
const passport = require('passport');


// use promises with mongoose
mongoose.Promise = global.Promise;

// connect to the database
mongoose.connect(mongoDBUrl ,{ 
    useNewUrlParser: true , useUnifiedTopology: true} ).then(db => {
    console.log('MongoDB connected!!');
}).catch(error => console.log(error));


// to be able to include css and js files from the public folder directly
app.use(express.static(path.join(__dirname, 'public')));

// set the view engine as handlebars and use a middleware to set it up
app.engine('handlebars' , exphbs({defaultLayout: 'home'}));
app.set('view engine' , 'handlebars');

// use sessions
app.use(session({
    secret: 'admins',
    resave: true,
    saveUninitialized: true
}));

// use flash
app.use(flash());

// passport settings
app.use(passport.initialize());
app.use(passport.session());

// local variables
app.use((req , res , next) => {
    // to make the user var local to the whole application
    res.locals.user = req.user || null;
    // to show a success message using flash
    res.locals.success_message = req.flash('success_message');
    // to show an error message when the user cannot sign in - we get the message from the passport settings that we already set up
    res.locals.error = req.flash('error');
    next();
});

// requiring the routes
const home = require('./routes/home/index');
const admin = require('./routes/admin/index');

// loading the routes to the application
app.use('/' , home);
app.use('/admin' , admin);

// listen to the server through port 3500
app.listen(3500 , () => {
    console.log('Listening to port 3500!');
});

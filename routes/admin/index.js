/**
 *
 *  Admin routes file
 *
 *
 * */


// require express 
const express = require('express');
// require the router of express
const router = express.Router();

// override the default layout
router.all('/*' , (req , res , next) => {
    req.app.locals.layout = 'admin';
    next();
});


/**
 *
 *  The main route, used to render the views in the admin's dashboard page
 *
 * */
router.get('/' , (req , res) => {
    res.render('admin/index');
});

/** 
 * 
 *  To create a new travel plan, this page will have a form to create a new travel plan
 * 
 */
router.get('/create' , (req ,res) => {
    res.render('admin/create');
});


// export the router 
module.exports = router;
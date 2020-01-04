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

/**
 *
 *  The main route, used to render the views in the admin's dashboard page
 *
 * */
router.get('/' , (req , res) => {
    res.render('admin/index');
});



// export the router 
module.exports = router;
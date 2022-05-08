const router = require('express').Router();
const  {User, Posts}  = require('../models');
const hasAuth = require('../utils/withAuth')

// Get all Posts
// route.post('/')

router.get('/login', async (req,res) => {
    // if (req.session.logged_in) {
    //     res.redirect('/')
    //     return
    // } else {
        res.render('loginpage')
    //}
    
})

router.get('/signup', async (req,res) => {
    // if (req.session.logged_in) {
    //     res.redirect('/')
    //     return
    // }
    res.render('signUpPage')
})

module.exports = router;
const router = require('express').Router();
const  {User, Posts}  = require('../models');
const hasAuth = require('../utils/withAuth')

// Get all Posts
router.get('/', async (req,res) => {
    try {
        const blogData = await Posts.findAll()
        const posts = blogData.map((post) => post.get({plain:true}));
        
        res.status(200)
        res.render('homepage', { posts })
    } catch (err) {
        res.status(500).json(`uh oh`)
    }
})

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
const router = require('express').Router();
const  {User, Posts}  = require('../models');
const hasAuth = require('../utils/withAuth')

// Homepage with posts
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
    if(req.session.logged_in){
        res.redirect('homepage');
        return;
    }
    res.render('loginpage')
})

router.get('/signup', async (req,res) => {
    try {
        res.render('signUpPage')
    } catch(err) {
        res.status.apply(500).json(err)
    }
})

router.get('/dashboard', hasAuth, async (req,res) => {
    try {
        const userData = await User.findByPk(req.session.user_id, {
            include: Posts
        });

        const user = userData.get({plain: true});
        res.render('dashboard', {
            ...user,
            logged_in: true
        })
    } catch(err) {
        res.status(500).json(err)
    }
})

module.exports = router;
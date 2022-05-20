const {Posts, Users} = require('../models');
const hasAuth = require('../utils/withAuth');
const router = require('express').Router();

let logged_in

router.get('/', async (req,res) => {
    try {
        //logged_in = req.session.logged_in;
        // res.status(200).json('insert home page here');
        const postsData = await Posts.findAll({
            include: Users            
        })
        const posts = postsData.map((post) => 
            post.get({plain:true})
        )
        res.render('homePage', {
            posts,
        })
    } catch(err) {
        res.status(500).json(err)
    }
});

router.get('/login', (req,res) => {
    if(req.session.logged_in) {
        // res.status(200).json('insert homepage here');
        res.render('homepage')
        return;
    } else {
        res.render('loginPage')
    }
});

router.get('/signup', (req,res) => {
    try {
        // res.status(200).json('insert signup page here')
        res.render('signupPage')
    } catch(err) {
        res.status(500).json(err)
    }
})

module.exports = router
const router = require('express').Router();
const { User } = require('../models');
const hasAuth = require('../utils/withAuth')

// Get all Posts
router.get('/', hasAuth, async (req,res)=>{
    try {
        const userLogin = await User.findAll({
            order: [['email', 'ASC']]
        });
        
        const users = userLogin.map((project)=>project.get({plain:true}))
        res.render('homepage',{
            users,
            logged_in: req.session.logged_in
        })
        //res.json(user)
        
    } catch (err) {
        res.status(500).json('Nope')
    }
})
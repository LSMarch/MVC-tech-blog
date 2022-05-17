const router = require('express').Router();
const {Users, Posts, Comments} = require('../../models');
//const { post } = require('./signupRoutes');

router.get('/', async (req,res) => {
    try {
        const post = await Posts.findAll()
        const posts = post.map((posts) => posts.get({plain:true}));
        res.status(200).json({posts})
    } catch(err) {
        res.status(500).json(err)
    }
})

router.get('/:id', async (req,res) => {
    try {
        const post = await Posts.findByPk(req.params.id, {
            include:[
                {
                    model: Comments, Users                    
                }
            ]
        });
        const onePost = post.get({plain:true});
        res.status(200).json({onePost})
    } catch(err) {
        res.status(400).json(err)
    }
})

router.post('/', async (req,res) => {
    try {
        const post = await Posts.create({
            ...req.body,
            users_id: req.session.user_id
        });
        res.status(200).json({post})
    } catch(err) {
        res.status(400).json(err)
    }
})

router.post('/:id', async (req,res) => {
    try {
        const post = await Comments.create({
            ...req.body,
            posts_id: req.params.id,
            users_id: req.session.user_id
        })
        res.status(200).json({post})
    } catch(err) {
        res.status(500).json(err)
    }
})

module.exports = router
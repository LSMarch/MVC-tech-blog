const router = require('express').Router();
const {Users, Posts, Comments} = require('../../models');
//const { post } = require('./signupRoutes');

// Find all posts
router.get('/', async (req,res) => {
    try {
        const postData = await Posts.findAll({include: Users})
        const posts = postData.map((post) => post.get({plain:true}));
        res.status(200).json({posts})
        //res.render('homePage', {posts})
    } catch(err) {
        res.status(500).json(err)
    }
})

// Find post by id
router.get('/:id', async (req,res) => {
    try {        
        const post = await Posts.findByPk(req.params.id, {
            include: [{
                model: Comments,
                include: {model: Users}
            }]   
        });
        const onePost = post.get({plain:true});
        res.status(200).json({onePost});
        //res.render('onePostPage', {onePost})
    } catch(err) {
        res.status(400).json(err)
    }
})

// Create post
router.post('/', async (req,res) => {
    try {
        const post = await Posts.create({
            //...req.body,
            title: req.body.title,
            contents: req.body.contents,
            user_id: req.session.user_id
        });
        res.status(200).json(post)
    } catch(err) {
        console.log(err)
        res.status(400).json(err)
    }
})

// Create comment
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

// Update post
router.put('/:id', async (req,res) => {
    try {
        const post = await Posts.update(
            {
                ...req.body
            },
            {
                where: {
                    id: req.params.id
                }
            }
        );
        res.status(200).json(post)
    } catch(err) {
        res.status(400).json(err)
    }
});

router.delete('/:id', async (req,res) => {
    try {
        const post = await Posts.destroy(
            {
                where: {
                    id: req.params.id
                }
            }
        )
        res.status(200).json('post deleted')
    } catch(err) {
        res.status(500).json(err)
    }
})

module.exports = router
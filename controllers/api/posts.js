const { Posts, User, Comments }= require('../../models');
const hasAuth = require('../../utils/withAuth')
const router = require('express').Router();

router.post('/', hasAuth, async (req,res) => {
    try {
        const newBlog = await Posts.create({               	
            title: req.body.title,
            description: req.body.description
        })      
        res.status(200).json(newBlog)
    } catch(err) {
        res.status(400).json(err)
        console.log(err)
    }
})

router.get('/:id', hasAuth, async (req,res) => {
    try {
        const findPost = await Posts.findByPk(req.params.id, {
            include: [{model: User,
                include: [{ model: Comments}]
            }]
        })
        const onePost = findPost.get({ plain: true });        
        //res.status(200).json(onePost)
        res.render('singlePost', {onePost})
        //console.log()
    } catch(err) {
        res.status(500).json(err)
    }
})

router.put('/:id', hasAuth, async (req,res) => {
    try {
        const updateBlog = await Posts.update(

            {
            include: User,
            title: req.body.title,
            description: req.body.description
        },
        {
            where: {
                id: req.params.id,
            }
        })
        res.status(200).json(updateBlog)
    } catch(err) {
        res.status(400).json(err)
    }
})

router.post('/:id', hasAuth, async (req,res) => {
    try {
        const comment = await Comments.create({
            ...req.body,
            post_id: req.params.id,
            user_id: req.session.user_id
        })
        res.status(200).json(comment)
    } catch (err) {
        res.status(500).json('kill me')
        console.log(err)
    }
})


module.exports = router
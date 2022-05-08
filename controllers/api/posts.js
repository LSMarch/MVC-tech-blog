const { Posts, User }= require('../../models');
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
        const findBlog = await Posts.findByPk(req.params.id, {
            include: User
        })
        
        res.status(200).json(findBlog)
    } catch(err) {
        res.status(500).json(err)
    }
})

router.put('/:id', hasAuth, async (req,res) => {
    try {
        const updateBlog = await Posts.update(
            {
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
        res.status(400).json(`you suck`)
    }
})

module.exports = router
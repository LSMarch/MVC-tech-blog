const { Posts }= require('../../models');

const router = require('express').Router();

router.post('/', async (req,res) => {
    try {
        const newBlog = await Posts.create({               	
            title: req.body.title,
            description: req.body.description
        })      
        res.status(200).json(newBlog)
    } catch(err) {
        res.status(400).json(`Son of a bitch`)
        console.log(err)
    }
})

module.exports = router
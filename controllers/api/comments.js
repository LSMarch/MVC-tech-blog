const { Posts, User, Comments }= require('../../models');
const hasAuth = require('../../utils/withAuth')
const router = require('express').Router();

router.post('/', async (req,res) => {
    try{
        const newComment = await Comments.create({
            include: User, Posts,
            description: req.body.description,
            user_id:req.session.user_id,
            //post_id:req.body.post_id
        })
        res.status(200).json(newComment)
    }catch(err){
        res.status(400).json(`FUCK`)
        console.log(err)
    }
})

module.exports = router
const { Posts, User, Comments }= require('../../models');
const hasAuth = require('../../utils/withAuth')
const router = require('express').Router();

router.get('/:id', hasAuth, async (req,res) => {
    try {
        
        const userData = await User.findByPk(req.body.user_id, {
            include: Posts,
            where: {
                id: req.body.user_id
            }
        });

        const userPosts = userData.map((posts) => posts.get({plain: true}));
        res.render({
            //...userPosts,
            ...userData,
            logged_in: true        
        })
        res.status(200).json(userData)
    } catch(err) {
        res.status(500).json(err)
        console.log(err)
    }
})

module.exports = router
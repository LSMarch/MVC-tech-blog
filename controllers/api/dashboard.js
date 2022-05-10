const { Posts, User, Comments }= require('../../models');
const hasAuth = require('../../utils/withAuth')
const router = require('express').Router();

router.get('/:id', hasAuth, async (req,res) => {
    try {
        
        const userData = await User.findByPk(req.session.user_id, {
            include: Posts,
            where: {
                id: req.session.user_id
            }
        });

        //const userPosts = userData.map((posts) => posts.get({plain: true}));
        res.render('dashboard', {
            //...userPosts,
            ...userData,
            logged_in: true
        })
    } catch(err) {
        res.status(500).json(err)
        console.log(err)
    }
})

module.exports = router
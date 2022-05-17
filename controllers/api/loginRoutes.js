const router = require('express').Router();
const Users = require('../../models/Users.js');

router.post('/', async (req,res) => {
    try {
        const existingUser = await Users.findOne({where:{username: req.body.username}});
        if(!existingUser){
            res.status(400).json(
                {message: `Incorrect username`}
            );
            return;
        }

        const validPass = await existingUser.checkPassword(req.body.password);

        if(!validPass){
            res.status(400).json(
                {message: `Incorrect password`}
            );
            return
        }

        req.session.save(() => {
            req.session.user_id = existingUser.id;
            req.session.logged_in = true;
            res.status(200).json({user: existingUser, message: `Logged in`})
        })
    } catch(err){
        res.status(400).json(err)
    }
})

module.exports = router;
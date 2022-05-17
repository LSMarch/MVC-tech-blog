const router = require('express').Router();
const Users = require('../../models/Users.js');

router.post('/', async (req,res) => {
    try {
        const newUser = await Users.create({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        });

        req.session.save(() => {
            req.session.user_id = newUser.id;
            req.session.logged_in = true;
            res.status(200).json(newUser);
        })
    } catch(err) {
        res.status(500).json(err)
    }
})

module.exports = router;
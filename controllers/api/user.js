const User = require('../../models/User');
//const sequelize = require('../../config/connection')

const router = require('express').Router();

// Create New User
router.post('/signup', async (req,res)=>{
    try {
        const existingUser = await User.findOne({
            where: {email: req.body.email}
        })
        if(existingUser) throw ('User Already Exists')

        const newUser = User.create({            
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        });

        req.session.save(() => {
            req.session.loggedIn = true;
            //res.status(200).json(newUser)
        })
        res.status(200).json(newUser)
    } catch (err) {
        res.status(400).json(err)
    }
})

// Login
router.post('/login', async (req,res) => {
    try {
        // find the user via email
        const userLogin = await User.findOne({ where: {email: req.body.email} })
        // if email doesn't match
        if (!userLogin) {
            res 
                .status(400)
                .json({ message: `Wrong email or password`});
            return;
        }
        // compares stored password with input password
        const validPass = await userLogin.checkPassword(req.body.password);
        // if password doesn't match
        if (!validPass) {
            res
                .status(400)
                .json({ message: `Wrong email or password`});
            return;
        }
        // saves something...
        req.session.save(() => {
            req.session.user_id = userLogin.id;
            req.session.logged_in = true;

            res.json({ user: userLogin, message: `You're in`})
        })
    } catch (err) {}
})

// Logout
router.post('/logout', async (req,res) => {
    if(req.session.logged_in) {
        req.session.destroy(() => {
            //204 = successful, no content
            res.status(204).end();
        })
    } else {
        //404 = client error, not found
        res.status(404).end();
    }
})

module.exports = router
const { User } = require('../../models');
//const sequelize = require('../../config/connection')

const router = require('express').Router();

// Create New User
router.post('/signup', async (req,res)=>{
    try {
        const existingUser = await User.findOne({
            where: {email: req.body.email}
        })
        if(existingUser) throw ('User Already Exists')

        const newUser = await User.create({            
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        });

        req.session.save(() => {
            req.session.user_id = newUser.id;
            req.session.loggedIn = true;
            res.json({ user: newUser, message: `You're in`})
        })       
    } catch (err) {
        res.status(400).json(err)
    }
})

// Login
router.post('/login', async (req,res) => {
    try {
        // find the user via email
        const userLogin = await User.findOne({ where: {username: req.body.username} })
        // if email doesn't match
        if (!userLogin) {
            res 
                .status(400)
                .json({ message: `Invalid username`});
            return;
        }
        // compares stored password with input password
        const validPass = await userLogin.checkPassword(req.body.password);
        // if password doesn't match
        if (!validPass) {
            res
                .status(400)
                .json({ message: `Invalid password`});
            return;
        }
        // saves something...
        req.session.save(() => {
            req.session.user_id = userLogin.id;
            req.session.logged_in = true;
            res.json({ user: userLogin, message: `You're in`})
        })
        //res.render('loginpage')
    } catch (err) {}
})

// router.get('/login', async (req,res) => {
//     // if (req.session.logged_in) {
//     //     res.redirect('/')
//     //     return
//     // }
//     res.render('loginpage')
// })
// router.get('/signup', async (req,res) => {
//     // if (req.session.logged_in) {
//     //     res.redirect('/')
//     //     return
//     // }
//     res.render('signUpPage')
// })

// Logout
router.delete('/logout', async (req,res) => {
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
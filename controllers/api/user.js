const User = require('../../models/User');
//const sequelize = require('../../config/connection')

const router = require('express').Router();

router.get('/', async (req,res)=>{
    try {
        const user = await User.findAll();
        res.status(200).json(user)
        //res.render('homepage')
    } catch (err) {
        res.status(500).json('Nope')
    }
})

router.post('/api/user', async (req,res)=>{
    try {
        const newUser = User.create({
            //id: req.body.id,
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        })
        res.status(200).json(newUser)
    } catch (err) {
        res.status(400).json(err)
    }
})

module.exports = router
const router = require('express').Router();
//const { Model } = require('sequelize/types');
const userRoute = require('./user');
const postsRoute = require('./posts')

router.use('/post', postsRoute)
router.use('/user', userRoute)

module.exports = router
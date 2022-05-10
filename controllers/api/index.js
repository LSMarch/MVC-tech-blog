const router = require('express').Router();
//const { Model } = require('sequelize/types');
const userRoute = require('./user');
const postsRoute = require('./posts')
const commentsRoute = require('./comments')
const dashboardRoute = require('./dashboard')

router.use('/dashboard', dashboardRoute)
router.use('/comment', commentsRoute)
router.use('/post', postsRoute)
router.use('/user', userRoute)

module.exports = router
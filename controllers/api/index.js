const router = require('express').Router();
//const { Model } = require('sequelize/types');
const userRoute = require('./user');

router.use('/user', userRoute)

module.exports = router
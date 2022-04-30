const router = require('express').Router();

const apiRoute = require('./api');
const homeRoute = require('./api/user')

router.use('/', homeRoute);

module.exports = router

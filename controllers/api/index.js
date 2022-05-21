const router = require('express').Router();
const userRoutes = require('./userRoutes')
const dashboard = require('./dashboardRoutes')

router.use('/user', userRoutes);
router.use('/dashboard', dashboard);

module.exports = router;
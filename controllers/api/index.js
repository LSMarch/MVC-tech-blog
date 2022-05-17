const router = require('express').Router();
const signupRoutes = require('./signupRoutes');
const loginRoutes = require('./loginRoutes');
const postsRoutes = require('./postsRoutes');

router.use('/signup', signupRoutes);
router.use('/login', loginRoutes);
router.use('/posts', postsRoutes);

module.exports = router;
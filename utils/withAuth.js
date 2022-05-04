//function checks if client is logged in, and redirects to login page if not
const hasAuth = (req,res,next) => {
    if(!req.session.logged_in) {
        res.redirect('/login');
    } else {
        next();
    }
}

module.exports = hasAuth;
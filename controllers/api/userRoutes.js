const router = require('express').Router();
const { response } = require('express');
const { Users } = require('../../models');



router.get('/signup', (req, res) => {
    res.render('signupPage')
})

// Sign up post route
router.post('/signup', async (req, res) => {
    
        // Find the user who matches with the username in the database
        // If there is no match with the username, send a incorrect message to the user and have them retry
       
          try {
              const createUser = await Users.create({
                  user_name: req.body.user_name,
                  email: req.body.email,
                  password: req.body.password

              });
                req.session.save(() => {
                  req.session.user_id = createUser.id;
                  console.log(req.session.user_id);
                  req.session.logged_in = true;
                  res.json(createUser);
                });
          } catch (err) {
              res.status(500).json(err)
          }
});


// Login route 
router.get('/login', (req, res) => {
  // If a session exists, redirect the request to the homepage
  
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }
   res.render('loginPage');
});

router.post('/login', async (req, res) => {
    try {
      // Find the user who matches with the username in the database
      const user = await Users.findOne({ where: {username: req.body.username}});
    
      // If there is no match with the username, send a incorrect message to the user and have them retry
      if (!user) {
        res.status(400).json({ message: 'Incorrect username or password, please try again' });
        return;
      }
  
      // Now verify the password the user has put in and check in the database if this password coincides with the username 
      const validPw = await user.checkPassword(req.body.password);
      
      // const validPw = await User.findOne({ where: {password: req.body.password }});
      // // If the password doesn't exist, then send a error message of wrong password and have them retry.
      if (!validPw) {
        res.status(401).json({ message: 'Incorrect password, please try again' });
        return;
      }
  
  
      // Session variables based on the current logged in user
      req.session.save(() => {
        req.session.user_id = user.id;
        req.session.logged_in = true;
        
        res.json({ user: user, message: 'You are logged in'})
      });
      
  
  
    } catch (error) {
      res.status(500).json(error);
      console.log(error)
    }
  });


//   Logout route 
router.get('/logout', (req, res) => {
    if (req.session.logged_in) {
      // Remove the session variables
      req.session.destroy(() => {
        res.status(204).end();
      });
    } else {
      res.status(404).end();
    }
    res.redirect("/");
  });

module.exports = router;
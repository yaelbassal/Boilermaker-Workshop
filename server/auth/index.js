const { User } = require('../database/user')
const router = require('express').Router()

//for returning users
router.put('/login', (req, res, next) => {
  User.findOne({
    where: {
      email: req.body.email
    }
  })
    .then(user => {
      if (!user) res.status(401).send('User not found');
      else if (!user.hasMatchingPassword(req.body.password)) res.status(401).send('Incorrect password');
      else {
        req.login(user, err => {
          if (err) next(err);
          else res.json(user);
        });
      }
    })
    .catch(next);
});

//for new users - creates a user

router.post('/signup', (req, res, next) => {
  User.create(req.body)
    .then(user => {
      req.login(user, err => {
        if(err) next(err);
        else res.json(user);
      });
    })
    .catch(next);
})

//To log out, we need to destroy the user on our session. Passport makes this very easy by attaching a logout method to the request object.

router.delete('/logout', (req, res, next) => {
  req.logout();
  req.session.destroy()
  res.sendStatus(204);
});

//method that our app can use to fetch the logged-in user on our session. Our client will make this request every time the client application loads - this allows us to keep the user logged in on the client even after they refresh.
router.get('/me', (req, res, next) => {
  res.json(req.user);
});

router.use('/google', require('./google'))


module.exports = router

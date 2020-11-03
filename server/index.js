const express = require('express');
const morgan = require('morgan');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const db = require('./database/database');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const dbStore = new SequelizeStore({ db: db});
const passport = require('passport');

//setting up app
const app = express()

/**
 * In your development environment, you can keep all of your
 * app's secret API keys in a file called `secrets.js`, in your project
 * root. This file is included in the .gitignore - it will NOT be tracked
 * or show up on Github. On your production server, you can add these
 * keys as environment variables, so that they can still be read by the
 * Node process on process.env
 */
if (process.env.NODE_ENV !== 'production') require('../secrets')


//Serialize/Deserialize User - passport needs to know how to serialize/deserialize the user. we serialize the user so that passport knows how to remember the user in the session store. Passport attaches the profile information to req.user and this occurs as a result of the serializeUser() and deserializeUser() functions. Passport.serialize and passport.deserialize are used to set id as a cookie in the user's browser and to get the id from the cookie when it then used to get user info in a callback.


passport.serializeUser((user, done) => {
  try{
    done(null, user.id);
  } catch (error) {
    done(error)
  }
})

passport.deserializeUser((id, done) => {
  User.findById(id)
  .then(user => done(null, user))
  .catch(done);
})

//logging middleware to help with debugging
app.use(morgan('dev'))

//static middleware - connecion for when browser requests static assets from the server - can include js files, css files, images that are usually stored in a public folder.
app.use(express.static(path.join(__dirname, '../public')))

//parsing middleware for req.body usage
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

//session middleware
//Then, on our deployment server, we can set an environment variable called SESSION_SECRET with our real secret! - where and how? - done by creating secret.js in root and adding file to .gitignore list.
app.use(session({
  secret: process.env.SESSION_SECRET || 'this is a secret secret',
  store: dbStore,
  resave: false,
  saveUninitialized: false
}))

app.use(passport.initialize())
app.use(passport.session())



//match all requests to /api - see api folder
app.use('/api', require('./api'))

//If a request from a browser does not match an api route, we want to send back out index.html file. This must be after all routes in index.js server entry file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'))
})

//handle 500 errors - internal server errors
app.use(function(err, req, res, next) {
  console.error(err);
  console.error(err.stack);
  res.status(err.status || 500).send(err.message || 'Internal server error.')
})

//starting the server -- moved to start.js
// const port = process.env.PORT || 3000;
// app.listen(port, function() {
//   console.log(`server listening on port ${port}`)
// })

module.exports = app

const router = require('express').Router()

//example for later: router.use('/users, require('./users')) Then have a seperate file in same folder for user routes.
router.use('/northeastpines', require('./northeastpines'))
router.use('/users', require('./users'))

//sends an error back to a user if an api route that is requested cannot be found. Only the ones expicitly defined on this page are correct routes. 404 indicates that the browser was able to communicate with the server BUT the server could not find what was requested.
router.use(function (req, res, next){
  const error = new Error('The route could not be found.');
  error.status = 404
  next(error)
})

module.exports = router

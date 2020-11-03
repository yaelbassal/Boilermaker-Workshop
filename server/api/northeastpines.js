const { NEPine } = require('../database/nePines')
const router = require('express').Router()

//mounted on api/northeastpines
router.get('/', async(req, res, next) => {
  try{
    const nePines = await NEPine.findAll();
    res.json(nePines)
  } catch(error) {
    next(error)
  }
})

module.exports = router

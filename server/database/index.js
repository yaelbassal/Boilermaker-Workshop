//file to make associations and import datatabases and export databasules for other modules.

const db = require('./database')
const NEPine = require('./nePines')
const User = require('./user')

//...associations


module.exports = {
  db,
  NEPine,
  User
}

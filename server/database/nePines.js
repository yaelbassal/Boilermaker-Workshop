//acts as interface to our database. node.postgres translates sequelize js so that we can communicate with postgres
const Sequelize = require('sequelize')
//db is a sequelize instance to connect us to postgres database
const db = require('./database')

//define model

const NEPine = db.define('nepine', {
  commonName: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    }
  },
  latinName: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    }
  },
  region: {
    type: Sequelize.STRING,
  },
  description: {
    type: Sequelize.TEXT
  },
  imageUrl: {
    type: Sequelize.TEXT
  },
  needleImageUrl: {
    type: Sequelize.TEXT,
  },
  coneImageUrl: {
    type: Sequelize.TEXT,
  },
  barkImageUrl: {
    type: Sequelize.TEXT
  }
})

//acts as interface to our database. node.postgres translates sequelize js so that we can communicate with postgres
const Sequelize = require('sequelize');
//db is a sequelize instance to connect us to postgres database
const db = require('./database');
const _ = require('lodash');
//node's crypto module
const crypto = require('crypto')

//user model
const User = db.define('user', {
  email: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  },
  password: {
    type: Sequelize.STRING
  },
  salt: {
    type: Sequelize.STRING
  },
  google_id: {
    type: Sequelize.STRING
  },
}, {
  hooks: {
    beforeCreate: setSaltAndPassword,
    beforeUpdate: setSaltAndPassword
  }
});

//salting and hashing are ways to make user passwords more secure! We are using salt here - 'https://www.theguardian.com/technology/2016/dec/15/passwords-hacking-hashing-salting-sha-2'

// instance methods
User.prototype.correctPassword = function (candidatePassword) {
  return this.Model.encryptPassword(candidatePassword, this.salt) === this.password;
};

User.prototype.sanitize = function () {
  return _.omit(this.toJSON(), ['password', 'salt']);
};

// class methods
User.generateSalt = function () {
  return crypto.randomBytes(16).toString('base64');
};

User.encryptPassword = function (plainText, salt) {
  const hash = crypto.createHash('sha1');
  hash.update(plainText);
  hash.update(salt);
  return hash.digest('hex');
};

function setSaltAndPassword (user) {
  // we need to salt and hash again when the user enters their password for the first time
  // and do it again whenever they change it
  if (user.changed('password')) {
    user.salt = User.generateSalt()
    user.password = User.encryptPassword(user.password, user.salt)
  }

}

module.exports = User;

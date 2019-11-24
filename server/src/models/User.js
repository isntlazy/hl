const bcrypt = require('bcrypt')

async function hashPassword (user, options) {
  if (!user.changed('password')) {
    return
  }

  await bcrypt.hash(user.password, 10)
    .then(function (hash) {
      user.setDataValue('password', hash)
    })
}

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    email: {
      type: DataTypes.STRING,
      unique: true
    },
    password: {
      type: DataTypes.STRING
    }
  }, {
    hooks: {
      beforeCreate: hashPassword,
      beforeUpdate: hashPassword
    }
  })
  User.prototype.comparePassword = function (password) {
    return bcrypt.compare(password, this.password)
  }
  return User
}

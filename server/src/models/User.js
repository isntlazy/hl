const bcrypt = require('bcrypt')

function hashPassword (user, options) {
  if (!user.changed('password')) {
    return
  }
  const hash = bcrypt.hashSync(user.password)
  user.setDataValue('password', hash)
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
      beforeUpdate: hashPassword,
      beforeSave: hashPassword
    }
  })
  User.prototype.comparePassword = function (password) {
    return bcrypt.compare(password, this.password)
  }
  return User
}

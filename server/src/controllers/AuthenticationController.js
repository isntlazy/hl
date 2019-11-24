const { User } = require('../models')
const jwt = require('jsonwebtoken')
const config = require('../config/config')

function jwtSignUser (user) {
  const ONE_WEEK = 60 * 60 * 24 * 7
  return jwt.sign(user, config.authentication.jwtSecret, {
    expiresIn: ONE_WEEK
  })
}

module.exports = {
  async register (req, res) {
    try {
      const user = await User.create(req.body)
      res.send(user.toJSON())
    } catch (e) {
      res.status(400).send({
        error: 'Ваш email уже зарєстровано в системі'
      })
    }
  },
  async login (req, res) {
    try {
      const { email, password } = req.body
      const user = await User.findOne({
        where: {
          email
        }
      })
      if (!user) {
        res.status(403).send({
          error: 'Некоректні дані входу'
        })
      }
      const isPasswordValid = user.comparePassword(password)
      if (!isPasswordValid) {
        res.status(403).send({
          error: 'Некоректні дані входу'
        })
      }
      const userJson = user.toJSON()
      res.send({
        user: userJson,
        token: jwtSignUser(userJson)
      })
    } catch (e) {
      res.status(500).send({
        error: 'Виникла проблема входу в систему'
      })
    }
  }
}

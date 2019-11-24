const { User } = require('../models')

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
  }
}

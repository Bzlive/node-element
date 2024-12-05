const Base = require('./base')
const Jwt = require('../middleware/jwt')

class Verify extends Base {
  constructor() {
    super()
    this.VerifyToken = this.VerifyToken.bind(this)
  }

  VerifyToken (req, res, next) {
    return Jwt.verify(req, res, next)
  }
}

module.exports = new Verify()
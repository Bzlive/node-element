
const Base = require('./base')
const Jwt = require('../middleware/jwt')
const connection = require('../sql')

class Login extends Base {
  constructor() {
    super()
    this.login = this.login.bind(this)
  }

  login (req, res) {
    const { body } = req
    const { phone_number, password } = body
    const sql = 'SELECT * FROM user WHERE phone_number = ? AND password = ?'
    connection.query(sql, [phone_number, password], (err, result) => {
      const user = result?.[0];
      if (err) {
        res.json({
          code: err.errno,
          message: "操作失败",
          data: err.sqlMessage,
        })
        return;
      }
      // 生成token
      const token = Jwt.encrypt( { data: { id: user.id, username: user.name   } })
      res.json({
        code: 0,
        message: "操作成功",
        data: { ...user, token },
      });
    })
  }
}

module.exports = new Login()
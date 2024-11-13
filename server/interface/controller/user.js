const Base = require('./base')
const connection = require('../sql')

class User extends Base {
  constructor() {
    super()
    this.list = this.list.bind(this)
    this.add = this.add.bind(this)
    this.edit = this.edit.bind(this)
    this.del = this.del.bind(this)
  }

  list (req, res) {
    const { query } = req
    const countSql = 'SELECT COUNT(*) AS total_records FROM user';
    connection.query(countSql, (err, countResults) => {
      if (err) {
        res.json({
          code: err.errno,
          message: "操作失败",
          data: err.sqlMessage,
        })
        return;
      }
      const current = query.current || 1
      const pageSize = query.pageSize || 10
      const total = countResults[0].total_records;
      const page = Math.ceil(total / pageSize);

      const paramsArr = ['name', 'gender', 'pheone_number']
      const conditions = paramsArr.reduce((prev, current) => {
        if (query[current]) prev.push(`${current} = ${query[current]}`)
        return prev
      }, [])

      let sql = `SELECT * FROM user`
      if (conditions.length) sql += ` WHERE ${conditions.join(' OR')}`
      if (current || pageSize) {
        const offset = (current - 1) * pageSize;
        sql += ` LIMIT ${pageSize} OFFSET ${offset}`
      }
      connection.query(sql, (err, result, fileds) => {
        if (err) {
          res.json({
            code: err.errno,
            message: "操作失败",
            data: err.sqlMessage,
          })
          return;
        }
        res.json({
          code: 0,
          message: "操作成功",
          data: {
            current: query.current || 1,
            pageSize,
            total,
            page,
            records: result,
          },
        })
      })
    })
  }

  async add (req, res) {
    const { body } = req
    const validate = await this.validateFields({
      name: { required: true },
      age: { required: true },
      gender: { required: true },
      phone_number: { required: true, rule: /^1[3456789]\d{9}$/ },
      password: { required: true, rule: /^.{7,}$/ },
    }, req, res)
    if (!validate) return
    const sql = `INSERT INTO user (name, age, gender, phone_number, password) VALUES (?, ?, ?, ?, ?)`
    connection.query(sql, [body.name, body.age, body.gender, body.phone_number, body.password], (err, result, fileds) => {
      if (err) {
        res.json({
          code: err.errno,
          message: "操作失败",
          data: err.sqlMessage,
        })
        return;
      }
      res.json({
        code: 0,
        message: "操作成功",
        data: result.insertId,
      })
    })
  }

  async edit (req, res) {
    const { body } = req
    const validate = await this.validateFields({
      id: { required: true },
      name: { required: true },
      age: { required: true },
      gender: { required: true },
      phone_number: { required: true, rule: /^1[3456789]\d{9}$/ },
      password: { required: true, rule: /^.{7,}$/ },
    }, req, res)
    if (!validate) return
    const sql = `
      UPDATE user
      SET
        name = ?,
        age = ?,
        gender = ?,
        phone_number = ?,
        password = ?
      WHERE id = ?
    `
    connection.query(sql, [body.name, body.age, body.gender, body.phone_number, body.password, body.id], (err, result, fileds) => {
      if (err) {
        res.json({
          code: err.errno,
          message: "操作失败",
          data: err.sqlMessage,
        })
        return;
      }
      res.json({
        code: 0,
        message: "操作成功",
        data: body.id,
      })
    })
  }

  async del (req, res) {
    const { query } = req
    const validate = await this.validateFields({
      id: { required: true }
    }, req, res)
    if (!validate) return
    const sql = `DELETE FROM user WHERE id = ?`
    connection.query(sql, [query.id], (err, result, fileds) => {
      if (err) {
        res.json({
          code: err.errno,
          message: "操作失败",
          data: err.sqlMessage,
        })
        return;
      }
      res.json({
        code: 0,
        message: "操作成功",
        data: true,
      })
    })
  }
}

module.exports = new User()
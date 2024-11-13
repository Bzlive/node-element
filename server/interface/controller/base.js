
class Base {
  constructor() {
    this.validateFields = this.validateFields.bind(this)
  }

  /**
   * 校验字段
   * @param {*} fileds {key: value}
   * {
   *  required: 是否必填
   *  rule：校验规则，正则匹配
   *  message: 提示文案
   * }
   * @param {*} req 
   * @param {*} res 
   * @returns 
   */
  validateFields (fileds, req, res) {
    const { method, query, body } = req
    const params = method === 'POST' ? query : body
    let state = true;
    for (const key in params) {
      const item = fileds[key]
      if (item.required && !params[key]) {
        state = false;
        res.send({
          code: 400,
          message: item.message || `请传入${key}参数`,
          data: null,
        })
        break;
      } else if (item.rule && params[key] && !item.rule?.test(params[key])) {
        state = false;
        res.send({
          code: 400,
          message: item.message || `${key}参数类型不正确`,
          data: null,
        })
        break;
      }
    }
    return state
  }
}

module.exports = Base
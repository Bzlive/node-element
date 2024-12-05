const jwt = require('jsonwebtoken')

const JWT_SECRET = "jwt_secret"
const TOKEN_NAME = "Token"

const Token = {
  // 生成
  encrypt: (data, time = '7d') => {
    return jwt.sign({ data }, JWT_SECRET, { expiresIn: time })
  },
  // 解析
  decrypt: (token) => {
    try {
      let data =  jwt.verify(token, JWT_SECRET)
      return {
        token: true,
        data
      }
    } catch (e) {
      return {
        token: false,
        data: e
      }
    }
  },
  // 验证
  verify: (req, res, next) => {
    const token = req.header(TOKEN_NAME);
 
    if (token == null) {
      return res.sendStatus(401);
    }
  
    jwt.verify(token, JWT_SECRET, (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }
  
      req.user = user;
      next();
    });
  }
}

module.exports = Token

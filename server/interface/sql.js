const mysql = require('mysql');

// 创建与数据库的连接,数据库连接池
const connection = mysql.createPool({
    host: 'localhost', //数据库地址
    port: '3306', //端口号
    user: 'root', //用户名
    password: '123456', //密码
    database: 'test', //数据库名称
    timezone: '08:00', //设置时区
    connectionLimit: 10, // 连接数量限制
});

connection.getConnection((err, connection) => {
  console.log('%c [ err ]-15', 'font-size:13px; background:pink; color:#bf2c9f;', err)
  console.log('%c [ connection ]-15', 'font-size:13px; background:pink; color:#bf2c9f;', connection)
})

module.exports = connection
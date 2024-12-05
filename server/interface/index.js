const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
// const log4jsMiddleware = require('./logs/log4.js')

// 接口路由入口
const router = require('./router/index.js')

// 日志
// log4jsMiddleware.use(app)

app.all('*', (req, res, next) => {
  const { origin, Origin, referer, Referer } = req.headers;
  const allowOrigin = origin || Origin || referer || Referer || '*';
	res.header("Access-Control-Allow-Origin", allowOrigin);
	res.header("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With");
	res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Credentials", true); //可以带cookies
	res.header("X-Powered-By", 'Express');
	if (req.method == 'OPTIONS') {
  	res.sendStatus(200);
	} else {
    next();
	}
});

// 解决跨域
app.use(cors())

// 解析静态资源的中间件
app.use(express.static('public'))

//配置表单提交数据
app.use(bodyParser.json()) //配置json数据
//解析post的json数据
app.use(bodyParser.urlencoded({
  extended: false
}))

//路由调用
router(app)

// 中间件  处理 404 错误
app.use(function ( req, res, next) {
  res.status(404).send('Not found!')
})

// 中间件 处理 500 错误
app.use(function (err, req, res, next) {
  console.error(err.stack)
  res.status(500).send('Something broke!')
})

// 启动服务器
const port = 43999
app.listen(port, () => {
  console.log(`服务器已启动，http://127.0.0.1:${port}`)
})
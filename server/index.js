const http = require('http');
const url = require('url');

// 创建 http 服务器
const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain'})

  res.end('hellow node');
})

// 监听端口
const prot = 3000;
server.listen(prot, () => {
  console.log(`Server runing at http://127.0.0.1:${prot}/`)
})

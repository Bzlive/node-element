const http = require('http');
const url = require('url');

// 创建 http 服务器
const server = http.createServer((req, res) => {
  // 解析 url
  const parsedUrl = url.parse(req.url, true);
  // 处理 url
  switch(parsedUrl.pathname) {
    case '/':
      res.writeHead(200, {'Content-Type': 'text/html'})
      res.end('<h1>Home</h1>')
      break;
    case '/about':
      res.writeHead(200, {'Content-Type': 'text/html'})
      res.end('<h1>About</h1>>')
      break;
    default:
      res.writeHead(200, {'Content-Type': 'text/html'})
      res.end('<h1>404 Not Found</h1>')
      break;
  }
})

// 监听端口
const prot = 3001;
server.listen(prot, () => {
  console.log(`Server runing at http://127.0.0.1:${prot}/`)
})

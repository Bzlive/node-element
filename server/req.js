const http = require('http');

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'application/json' });
  if (req.method === 'GET') {
    res.end(JSON.stringify({ message: 'Hello, World!' }))
  } else if (req.method === 'POST') {
    let body = '';

    req.on('data', chunk => {
      body += chunk.toString();
    })

    req.on('end', () => {
      res.end(JSON.stringify({message: 'Data received', data: body}));
    })
  } else {
    res.writeHead(405, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify({ error: 'Method Not Allowed' }))
  }
})

// 监听端口
const prot = 3002;
server.listen(prot, () => {
  console.log(`Server runing at http://127.0.0.1:${prot}/`)
})
const http = require('http')
const crypto = require('crypto')

// 启动服务
const server = http.createServer((req, res) => {
  const errCode = 400
  res.writeHead(errCode, { 'Content-Type': 'text/plain' })

  res.end(`${http.STATUS_CODES[errCode]}`)
})

// 升级协议
server.on('upgrade', (req, socket, head) => {
  const key = req.headers["sec-websocket-key"]
  const acceptValue = generateAcceptValue(key)
  const resHeaders = [
    "HTTP/1.1 101 Switching Protocols",
    "Upgrade: websocket",
    "Connection: Upgrade",
    `Sec-WebSocket-Accept: ${acceptValue}`
  ]

  socket.write(resHeaders.join("\r\n") + "\r\n\r\n")

  socket.on('data', (buffer) => {
    socket.write(generateWebsocketFrame('pong'))
  })

  const frame = generateWebsocketFrame('hellow')
  socket.write(frame)
})


// 监听端口
const prot = 4000;
server.listen(prot, () => {
  console.log(`Server runing at http://127.0.0.1:${prot}/`)
})

// 根据客户端的 websocket key 生成 sec-websocket-key
function generateAcceptValue (secWebsocketKey) {
  return crypto.createHash("sha1").update(secWebsocketKey + "258EAFA5-E914-47DA-95CA-C5AB0DC85B11", 'binary').digest('base64')
}

// 生成 websocket 的数据贞
function generateWebsocketFrame(data) {
  const msg = Buffer.from(data)
  const frame = Buffer.alloc(2 + msg.length)
  frame[0] = 0x81
  frame[1] = msg.length
  msg.copy(frame, 2)

  return frame
}

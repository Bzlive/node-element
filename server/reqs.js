const express = require('express')
const app = express()
const port = 3003
 
// 中间件解析 JSON 请求体  
app.use(express.json());
  
// 处理 GET 请求  
app.get('/', (req, res) => {  
  res.json({ message: 'Hello, World!' });  
});  
  
// 处理 POST 请求  
app.post('/data', (req, res) => {
  const receivedData = req.body;  
  res.json({ received: receivedData, desc: 'this is about' });  
});  
  
// 处理其他 HTTP 方法  
app.use((req, res, next) => {
  res.status(405).json({ error: 'Method Not Allowed' });  
});  
  
// 启动服务器  
app.listen(port, () => {  
  console.log(`Server is running on port http://127.0.0.1:${port}`);  
});
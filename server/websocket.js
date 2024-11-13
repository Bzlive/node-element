const WebSocket = require('ws');
const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());

const prot = 4001
const server = app.listen(prot, () => {
  console.log(`Server started on ws://127.0.0.1:${prot}/`);
});

const wss = new WebSocket.Server({ server });

wss.on('connection', (ws) => {
  ws.on('message', (message) => {
    console.log(`Received message => ${message}`);
    wss.clients.forEach((client) => {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });
});

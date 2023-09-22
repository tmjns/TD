const http = require('http');
const WebSocket = require('ws');
const socketIo = require('socket.io');

const qrcode = require('qrcode-terminal');

/////////////////////////////////////////////////////////////////////////////////////

const socketIoServer = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Server is up and running. Use http://localhost:3000 for incoming data.');
});

const io = socketIo(socketIoServer);

/////////////////////////////////////////////////////////////////////////////////////

const webSocketServer = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('WebSocket server is running');
});

const wss = new WebSocket.Server({ server: webSocketServer });

/////////////////////////////////////////////////////////////////////////////////////

qrcode.generate('https://192.168.178.31:5010/', {small: true});

/////////////////////////////////////////////////////////////////////////////////////
// Store WebSocket clients
const websocketClients = new Set();

/////////////////////////////////////////////////////////////////////////////////////

io.on('connection', (socket) => {
  console.log('Socket.io client connected');

  // When a message is received from a Socket.io client
  socket.on('message', (data) => {
    console.log('Data from the Front-End:', data);
    const json = JSON.stringify(data);
    
    // Send the data to all WebSocket clients
    websocketClients.forEach((client) => {
      client.send(json);
    });
  });

});

/////////////////////////////////////////////////////////////////////////////////////

wss.on('connection', (ws) => {
  console.log('WebSocket client connected');

  // Add WebSocket client to the set
  websocketClients.add(ws);

  ws.on('close', () => {
    console.log('WebSocket client disconnected');
    websocketClients.delete(ws);
  });
});

/////////////////////////////////////////////////////////////////////////////////////

socketIoServer.listen(3000, () => {
  console.log('Socket.io server is running on port 3000');
});

webSocketServer.listen(8080, () => {
  console.log('WebSocket server is running on port 8080');
});
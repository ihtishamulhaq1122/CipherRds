const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const cors = require('cors');

const app = express();
app.use(cors());
const server = http.createServer(app);
const io = socketIO(server, {
  cors: {
    origin: '*',
  }
});

app.use(express.static('public'));

io.on('connection', (socket) => {
  console.log('A user connected');

  // Handle WebSocket messages here if needed
  socket.on('message', (data) => {
    console.log('Received WebSocket message:', data);
    // Broadcast the message to all connected clients
    io.emit('message', data);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

const port = process.env.PORT || 3002;
server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

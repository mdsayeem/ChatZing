require('dotenv').config()

const express = require('express');
const app = express();
const http = require('http').createServer(app);


const PORT = process.env.PORT || 3000;

http.listen(process.env.PORT, () => {
    console.log(`Listening on port ${process.env.PORT}`);
});

app.use(express.static(__dirname + '/public'));


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.get('/index2.html', (req, res) => {
    res.sendFile(__dirname + '/index2.html');
});

// Socket 
const io = require('socket.io')(http);

io.on('connection', (socket) => {
    console.log('Connected...');
    socket.on('message', (msg) => {
        socket.broadcast.emit('message', msg);
    });
});

const path = require('path');
const express = require('express');
const socketIO = require('socket.io');
const http = require('http');

var app = express();
var server = http.createServer(app);
var io = socketIO(server);

const publicPath = path.join(__dirname, '..', '/public');
const port = process.env.PORT || 3001;

app.use(express.static('public'));

io.on('connection', (socket)=>{
    console.log('new user connected');

    socket.on('disconnect', ()=>{
        console.log('new user disconnected')
    })
});
 
server.listen(port, ()=>{
    console.log('listening on port '+port);
});
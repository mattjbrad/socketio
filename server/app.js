const path = require('path');
const express = require('express');
const socketIO = require('socket.io');
const http = require('http');

var app = express();
var server = http.createServer(app);
var io = socketIO(server);

const {generateMessage} = require('./utils/message');
const publicPath = path.join(__dirname, '..', '/public');
const port = process.env.PORT || 3001;

app.use(express.static('public'));

io.on('connection', (socket)=>{
    console.log('new user connected');

    socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));
    socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user joined'));

    socket.on('createMessage', (message, callback) =>{
        io.emit('newMessage', generateMessage(message.from, message.text));
        //confirm the message was received
        callback('This is from the server');
    });

    socket.on('disconnect', ()=>{
        //do something
    })
});

 
server.listen(port, ()=>{
    console.log('listening on port '+port);
});
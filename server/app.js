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

    socket.emit('newMessage', {
        from:'Admin',
        text:'Welcome',
        createdAt: new Date().getTime()
    });
    socket.broadcast.emit('newMessage', {
        from:'Admin',
        text:'New User Joined',
        createdAt: new Date().getTime()
    });

    socket.on('createMessage', (message) =>{
        io.emit('newMessage', {
            from:message.from,
            text:message.text,
            createdAt: new Date().getTime()
        });
        console.log('Created Message - ', message);
        // socket.broadcast.emit('newMessage', {
        //     from:message.from,
        //     text:message. text,
        //     createdAt: new Date().getTime()
        // });
    });

    socket.on('disconnect', ()=>{
        console.log('new user disconnected')
    })
});

 
server.listen(port, ()=>{
    console.log('listening on port '+port);
});
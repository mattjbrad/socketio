const path = require('path');
const express = require('express');
const socketIO = require('socket.io');
const http = require('http');

var app = express();
var server = http.createServer(app);
var io = socketIO(server);

const {generateMessage, generateLocationMessage} = require('./utils/message');
const publicPath = path.join(__dirname, '..', '/public');
const {isRealString} = require('./utils/validation');
const {Users} = require('./utils/users');

var users = new Users();

const port = process.env.PORT || 3001;

app.use(express.static('public'));

io.on('connection', (socket)=>{

    socket.on('join', (params, callback) => {
        if(!isRealString(params.name) || !isRealString(params.name)) {
            return callback('Name and room name are required');
        }
        
        socket.join(params.room);
        users.removeUser(socket.id);
        users.addUser(socket.id, params.name, params.room);
        socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));
        socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} has joined the room`));

        io.to(params.room).emit('updateUserList', users.getUserList(params.room));
        callback();
    });

    socket.on('createMessage', (message, callback) =>{
        socket.
        io.emit('newMessage', generateMessage(message.from, message.text));
        //confirm the message was received
        callback();
    });

    socket.on('createLocationMessage', (coords)=>{
        io.emit('newLocationMessage', generateLocationMessage('Location', coords.lat, coords.long));
    });
    socket.on('disconnect', ()=>{
        var user = users.removeUser(socket.id);

        if(user){
            io.to(user.room).emit('updateUserList', users.getUserList(user.room));
            io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left...`));
        }
    })
});

 
server.listen(port, ()=>{
    console.log('listening on port '+port);
});
var socket = io();
socket.on('connect', function () {
    console.log('connected to server')
});

socket.on('disconnect', function (){
    console.log('disconnected to server')
});

socket.on('newMessage', function (message){
    console.log('new message - ', message);
    var li = $('<li></li>');
    li.text(`${message.from}: ${message.text}`);
    $('#thread').append(li);
});

$('#message-form').on('submit', function(e){
    e.preventDefault();
    socket.emit('createMessage', {
        from:'Matt',
        text: $('[name=message]').val()
    }, function () {
        $('[name=message]').val('');
    });
});

var locationButton = $('#send-location');

locationButton.on('click', function(){
    if (!navigator.geolocation){
        return alert('Need a better browser');
    }
    navigator.geolocation.getCurrentPosition(function (position) {
        console.log(position);
    }, function(){
        alert('Unable to get location');
    })
});
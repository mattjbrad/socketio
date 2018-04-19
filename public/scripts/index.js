var socket = io();
socket.on('connect', function () {
    console.log('connected to server')
});

socket.on('disconnect', function (){
    console.log('disconnected to server')
});

socket.on('newMessage', function (message){
    var li = $('<li></li>');
    li.text(`${message.from}: ${message.text}`);
    $('#thread').append(li);
});

socket.on('newLocationMessage', function(message){
    var li = $('<li></li>');
    var a = $('<a target="_blank">My Current Location</a>');

    li.text(`${message.from}: `);
    a.attr('href', message.url);
    li.append(a);
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
        socket.emit('createLocationMessage', {
            lat: position.coords.latitude,
            long: position.coords.longitude
        });
        console.log(position);
    }, function(){
        alert('Unable to get location');
    })
});
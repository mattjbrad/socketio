var socket = io();
socket.on('connect', function () {
    console.log('connected to server')
});

socket.on('disconnect', function (){
    console.log('disconnected to server')
});

socket.on('newMessage', function (message){
     var formattedTime = moment(message.createdAt).format('h:mm a');
    // var li = $('<li></li>');
    // li.text(`${message.from} ${formattedTime} : ${message.text}`);
    // $('#thread').append(li);

    var template = $('#message-template').html();
    var html = Mustache.render(template, {
        text:message.text,
        createdAt: formattedTime,
        from: message.from
    });

    $('#thread').append(html);
});

socket.on('newLocationMessage', function(message){
    // var li = $('<li></li>');
    // var a = $('<a target="_blank">My Current Location</a>');
    var formattedTime = moment(message.createdAt).format('h:mm a');

    var template = $('#location-message-template').html();
    
    // li.text(`${message.from} ${formattedTime} : `);
    // a.attr('href', message.url);
    // li.append(a);
    // $('#thread').append(li);

    var html = Mustache.render(template, {
        url:message.url,
        createdAt: formattedTime,
        from: message.from
    });

    $('#thread').append(html);
});


$('#message-form').on('submit', function(e){
    e.preventDefault();
    var messageText = $('[name=message]');
    socket.emit('createMessage', {
        from:'Matt',
        text: messageText.val()
    }, function () {
        messageText.val('');
    });
});

var locationButton = $('#send-location');

locationButton.on('click', function(){
    if (!navigator.geolocation){
        return alert('Need a better browser');
    }

    locationButton.attr('disabled', 'disabled').text('Sending...');

    navigator.geolocation.getCurrentPosition(function (position) {
        socket.emit('createLocationMessage', {
            lat: position.coords.latitude,
            long: position.coords.longitude
        });
        locationButton.removeAttr('disabled').text('Send Location');
        console.log(position);
    }, function(){
        alert('Unable to get location');
        locationButton.removeAttr('disabled').text('Send Location');
    });

});
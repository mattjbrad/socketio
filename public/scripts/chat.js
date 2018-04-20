var socket = io();

function scrollToBottom(){

    //Selectors
    var thread = $('#thread');
    var newMessage = thread.children('li:last-child');

    //Heights
    var clientHeight = thread.prop('clientHeight');
    var scrollTop = thread.prop('scrollTop');
    var scrollHeight = thread.prop('scrollHeight');
    var newMessageHeight = newMessage.innerHeight();
    var lastMessageHeight = newMessage.prev().innerHeight();

    if ((clientHeight+scrollTop+newMessageHeight+lastMessageHeight) >= scrollHeight) {
        thread.scrollTop(scrollHeight);
    }
}

socket.on('connect', function () {
    var params = jQuery.deparam(window.location.search);
    socket.emit('join', params, function(err){
        if (err) {
            alert(err);
            window.location.href = '/';
        } else {
            console.log('No error');
        }
    });
});

socket.on('disconnect', function (){
    console.log('disconnected to server')
});

socket.on('newMessage', function (message){
    var formattedTime = moment(message.createdAt).format('h:mm a');
    var template = $('#message-template').html();

    var html = Mustache.render(template, {
        text:message.text,
        createdAt: formattedTime,
        from: message.from
    });

    $('#thread').append(html);
    scrollToBottom();
});

socket.on('newLocationMessage', function(message){

    var formattedTime = moment(message.createdAt).format('h:mm a');
    var template = $('#location-message-template').html();

    var html = Mustache.render(template, {
        url:message.url,
        createdAt: formattedTime,
        from: message.from
    });

    $('#thread').append(html);
    scrollToBottom();

});

socket.on('updateUserList', function(users) {
    var ol = $('<ol></ol>');
    users.forEach(function (user){
        ol.append($('<li></li>').text(user));
    });

    $('#users').html(ol);

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
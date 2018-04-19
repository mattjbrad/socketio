var generateMessage = (from, text) => {
    var message = {
        from,
        text,
        createdAt: new Date().getTime()
    };

    return message;
};

var generateLocationMessage = (from, lat, long) => {

    var url = `https://www.google.com/maps/?q=${lat},${long}`;
    var message = {
        from,
        url,
        createdAt: new Date().getTime()
    };

    return message;
};

module.exports = {generateMessage, generateLocationMessage};
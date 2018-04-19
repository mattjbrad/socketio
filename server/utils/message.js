var moment = require('moment');

var generateMessage = (from, text) => {
    var message = {
        from,
        text,
        createdAt: new moment().valueOf()
    };

    return message;
};

var generateLocationMessage = (from, lat, long) => {

    var url = `https://www.google.com/maps/?q=${lat},${long}`;
    var message = {
        from,
        url,
        createdAt: new moment().valueOf()
    };

    return message;
};

module.exports = {generateMessage, generateLocationMessage};
var expect = require('expect');
var {generateMessage, generateLocationMessage} = require('./message');

describe('Test that a message gets created correctly', ()=>{
    it('shoudld generate the correct message object', ()=>{
        var from = 'User';
        var text = 'this is an important message';
        var message = generateMessage(from, text);
        expect(typeof message.createdAt).toBe('number');
        expect(message.from).toBe(from);
        expect(message.text).toBe(text);
    });
});

describe('Test that a location message created correctly', ()=>{
    it('shoudld generate the correct location message object', ()=>{
        var from = 'Location';
        var lat = 52;
        var long = 2;
        var url = 'https://www.google.com/maps/?q=52,2';
        var message = generateLocationMessage(from, lat, long);
        expect(typeof message.createdAt).toBe('number');
        expect(message.from).toBe(from);
        expect(message.url).toBe(url);
    });
});
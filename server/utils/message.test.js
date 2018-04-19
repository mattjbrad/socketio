var expect = require('expect');
var {generateMessage} = require('./message');

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
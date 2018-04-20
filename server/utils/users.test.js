var {Users} = require('./users');
var expect = require('expect');

describe('Users', ()=>{

    var users;
    beforeEach(()=>{
        users = new Users();
        users.users = [{
            id: '1',
            name: 'ABC',
            room: 'cats'
        },
        {
            id: '2',
            name: 'DEF',
            room: 'dogs'
        },
        {
            id: '3',
            name: 'GHI',
            room: 'cats'
        }];
    });

    it('Should add new user', ()=>{
        var users = new Users();
        var user = {id:'123', name:'Matt', room: 'dogs'};
        var resUser = users.addUser(user.id, user.name, user.room);
        expect(users.users).toEqual([user]);
    });

    it('Should return names for room', ()=>{
        var userList = users.getUserList('cats');
        expect(userList).toEqual(['ABC', 'GHI']);
    });

    it('should remove a particular user', ()=>{
        var newUsers = users.removeUser('2');
        console.log(newUsers);
        expect(newUsers).toEqual([{
            id: '2',
            name: 'DEF',
            room: 'dogs'
        }]);
    });

    it('should not remove a particular user', ()=>{
        var removedUser = users.removeUser('8');
        expect(removedUser).toBeFalsy();
    });

    it('should return a particular user', ()=>{
        var resUser = users.getUser('1');
        expect(resUser).toEqual({
            id: '1',
            name: 'ABC',
            room: 'cats'
        });
    });

    it('should not return a particular user', ()=>{
        var resUser = users.getUser('99');
        expect(resUser).toBeFalsy();
    });
});
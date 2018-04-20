//Examples
// class Person {

//     constructor (name, age) {
//         this.name = name;
//         this.age = age;
//     }

//     getUserDescription () {
//         return `THe user name is ${this.name} and ${this.age} years old`;
//     }
// }

// var me = new Person('Matt', 27);
// console.log(me.age);
// console.log(me.getUserDescription());


class Users {
    
    constructor () {
        this.users = [];
    }

    addUser(id, name, room){
        var user = {id, name, room};
        this.users.push(user);
        return user;
    }

    removeUser(id){
        var index = this.users.findIndex((user)=>{
            return user.id === id;
        });
        if (index<0){
            return undefined;
        }
        var removedUser = this.users.splice(index, 1);
        return removedUser;
    }

    getUser(id){
        var resUser = this.users.find((user)=>{
            return user.id === id;
        });
        return resUser;
    }

    getUserList(room){
        var users = this.users.filter((user)=>{
            return user.room === room;
        });
        var namesArray = users.map((user)=>{
            return user.name;
        });
        return namesArray;
    }
}

module.exports = {Users};
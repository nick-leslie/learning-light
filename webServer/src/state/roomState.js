const idGen = require('shortid');


let rooms = {};
// all this should be in a data bace
let roomTeachers = ["ciras","crossman"];
// these should be hashed
let admin = {"adm":"admin"};
let teacher = {"testPass":0};
let macToTeacher = {"c8:2b:96:30:09:e9":"crossman"}

//genarates an object where each key is maped to a teacher
module.exports.populateKeys = () => {
    let keys = [];
    rooms = {};
    for (let i = 0; i < roomTeachers.length; i++) {
        keys.push(idGen.generate())
    }
    //console.log(keys);
    for (let i = 0; i < roomTeachers.length; i++) {
        //console.log(keys[i]);
        rooms[keys[i]]=roomTeachers[i];   
    }
    console.log(rooms);
    return rooms;
}
//grabs teacher from room rename nessesary
module.exports.grabTeacher = (roomKey) => {
    if(rooms[roomKey] != undefined) {
        return rooms[roomKey];

    } else if(admin[roomKey] != undefined) {
        return admin[roomKey];
    } else if(teacher[roomKey] != undefined) {
        console.log(teacher[roomKey]);
        return teacher[roomKey];

    }  else {
        return false
    }
}
// change it so the route takes in a teacher
module.exports.grabRoomKeys = (teacher) => {
    console.log(teacher + "this is in grab room keys")
    if(Object.keys(rooms).length > 0) {
        console.log(Object.keys(rooms).find(key => rooms[key] === teacher));
        return Object.keys(rooms).find(key => rooms[key] === teacher);
    } else {
        return false;
    }
}
module.exports.grabRooms = () => {
    if(Object.keys(rooms).length > 0) {
        return rooms;
    } else {
        return false;
    }
}
module.exports.listTeachers = () => {
    return roomTeachers;
}
module.exports.grabTeacherAtIndex = (index) => {
    console.log(roomTeachers[index]);
    return roomTeachers[index];
}
module.exports.grabTeacherFromMac = function(mac) {
    return macToTeacher[mac]
}
const roomState = require('../src/state/roomState');

test('testing populating room keys and then grabing a teacher from a room key', () => {
    let keys = roomState.setup()
    //console.log(listAllProperties(keys))


    let teacher = roomState.grabTeacher(listAllProperties(keys)[0]);

    expect(keys[listAllProperties(keys)[0]]).toStrictEqual(teacher);
});
test('testing the grab teacher from mac function', () => {
    expect(roomState.grabTeacherFromMac('c8:2b:96:30:09:e9')).toStrictEqual('crossman')
});
function listAllProperties(o) {
    var objectToInspect;     
    var result = [];

    for(objectToInspect = o; objectToInspect !== null; 
            objectToInspect = Object.getPrototypeOf(objectToInspect)) {  
        result = result.concat(
            Object.getOwnPropertyNames(objectToInspect)
        );  
    }

    return result; 
}
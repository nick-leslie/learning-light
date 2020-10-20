const roomState = require('../src/state/roomState');

test('testing populating room keys and then grabing a teacher from a room key', () => {
    let keys = roomState.populateKeys()
    //console.log(listAllProperties(keys))


    let teacher = roomState.grabTeacher(listAllProperties(keys)[0]);

    expect(keys[listAllProperties(keys)[0]]).toStrictEqual(teacher);
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
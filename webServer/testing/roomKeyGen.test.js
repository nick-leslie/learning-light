const roomState = require('../src/state/roomState')
test('tests room key genaration and grabing all rooms', () => {
    let roomKeys =  roomState.populateKeys();
    expect(roomKeys).toStrictEqual(roomState.grabRooms());
});

test('this should test grabing a teacher from a room key also tests grabing keys from values',() => {
    let roomKeys = roomState.grabRoomKeys(roomState.listTeachers()[0]);
    expect(roomState.grabTeacher(roomKeys)).toStrictEqual(roomState.listTeachers()[0]);
});


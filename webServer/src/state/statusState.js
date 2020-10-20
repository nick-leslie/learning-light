const roomState = require('./roomState')

let statuses = {};

module.exports.maniplauteTeacherStatus = (teacher,currentstatus) => {
    statuses[teacher] = currentstatus;
}

module.exports.getTeacherStatus = (teacher) => {
    return statuses[teacher];
}

module.exports.populateStatus = () => {
    for (let i = 0; i < roomState.listTeachers().length; i++) {
        statuses[roomState.listTeachers()[i]] = false;
    }
    console.log(statuses);
}
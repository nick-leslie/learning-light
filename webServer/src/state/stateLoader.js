const fs = require('fs')
const path = require('path')
//---------------------- raw readers
//raw file read
function readFile() {
    try {
      const data = fs.readFileSync(path.join(__dirname,'/staticState.json'),'utf-8');
      //console.log(data);
      return data;
    } catch (error) {
        console.log(error);
        return false;
    }
}
//interpret as json
module.exports.readAllJson = function readAllJson() {
   let raw = readFile()
   let json = JSON.parse(raw);
   return json;
}
//--------------------- perpious readers
//returns all teachers that have rooms
module.exports.getListOfTeachers = () => {
    let json = this.readAllJson();
    return json["teachers"]
}
// returns all admins and there passwords
module.exports.getListOfAdmins = () => {
    let json = this.readAllJson();
    return json["admins"]
}
//returns teacher passwords and what teacher they corispond with
module.exports.getTeacherPasswords = () => {
    let json = this.readAllJson();
    return json["teacherPasses"];
}
module.exports.getLightLookupTable = () => {
    let json = this.readAllJson();
    return json["lightLookup"]
}
//----------------------- raw writers
function writeFile(formated) {

}

module.exports.writeJson = () => {

    //writeFile()
}
//---------------------- constructors

module.exports.constrouctLookUpTable = () => {

}

module.exports.constructTeacherTable = () => {

}
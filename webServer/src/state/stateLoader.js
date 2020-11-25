const { json } = require('body-parser');
const fs = require('fs')
//---------------------- raw readers
readAllJson()
//raw file read
function readFile() {
    try {
      const data = fs.readFileSync('./staticState.json','utf-8');
      console.log(data);
      return data;
    } catch (error) {
        console.log(error);
        return false;
    }
}
//interpret as json
function readAllJson() {
   let raw = readFile()
   let json = JSON.parse(raw);
   console.log(json["lightLookup"]);
   return json;
}
//--------------------- perpious readers
//returns all teachers that have rooms
module.exports.getListOfTeachers = () => {

}
// returns all admins and there passwords
module.exports.getListOfAdmins = () => {

}
//returns teacher passwords and what teacher they corispond with
module.exports.getTeacherPasswords = () => {

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
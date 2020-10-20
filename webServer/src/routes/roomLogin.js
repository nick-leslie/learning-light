const express = require('express');
const router = express.Router();
const tokenGen = require('../verification/genApiKey');
const roomState = require('../state/roomState');
const tokenVerification = require('../verification/decryoptApiKey');

// alows for students to enter room will respond with a jwt acess token awoing them to press the buttion
router.post("/",(req,res) => {
    let roomKey = req.body.key;
    console.log(req.body);
    let teacher = roomState.grabTeacher(roomKey);
    console.log(teacher);
    //returns the teacher of the given room key so the students can send jobs right to the teacher
    if(teacher !== false) {
        if(roomState.grabTeacherAtIndex(teacher) != undefined) {
            res.status(200).send({message:"you have loged into teacher",status:"teacher",token:tokenGen.addNewKey(teacher,"teacher"), keys:roomState.grabRoomKeys(roomState.grabTeacherAtIndex(teacher))});
        }else if(teacher=="admin") {
            // this is the admin route that returns all keys
            res.status(200).send({message:"you have loged into admin",status:"admin",token:tokenGen.addNewKey(teacher,"admin"), keys:roomState.grabRooms()});
        } else {
            res.status(200).send({message:"you have logged in to a room",status:"student" , token:tokenGen.addNewKey(teacher,"student")});
        }
    } else {
        res.status(401).send({message:"wrong key"});
    }
});


//genarates room keys will be automated and hidden behind a admin wall
router.post("/genarate", (req,res) => {
    let token  = tokenVerification.verifyFunc(req.body.token);
    if(token != false) {
        if(token.status == "admin") {
        let keys = roomState.populateKeys();
    
        res.status(200).send({message:"genarated room keys",keys:keys});
        } else {
            res.status(401).send({message:"you are not an admin"})
        }
    } else {
        res.status(401).send({message:"you are not an admin"})
    }
});

module.exports = router;
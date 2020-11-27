const express = require('express');
const router = express.Router();
//--------------------------------
const jobConstructor = require('../dataConstructors/jobConstructor');
const jobList = require('../state/jobState');
const tokenVerification = require('../verification/decryoptApiKey');
const statusState = require('../state/statusState');
const roomState = require('../state/roomState');

// sends back a job for the light to do
router.post("/",(req,res)=> {
    console.log(req.body);
    let mac = req.body.macAdress;
    //grabs teacher from mac
    let teacher = roomState.grabTeacherFromMac(mac);
    // grabs singal job from the job que to retrun to the arducino
    let jobs = jobList.grabJob(teacher);
    //manipulates the status of a spesifc room so the room reflects the light
    let status = req.body.status;
    statusState.maniplauteTeacherStatus(teacher,status);

    if(jobs != false) {
        //if there is a job to send send back the job
        jobs = jobs.data;
        console.log(jobs);
        //returns job in https responce
        res.status(200).send(jobs);
    } else {
        // returns no work
        res.status(200).send({message:`no work for ${teacher}`});
    }
});
// this is requesting to put a job in the web cite
router.post("/request",(req,res)=> {
    console.log(req.body);
    
    // verifying the token proveided 
    let token = tokenVerification.verifyFunc(req.body.token);
    if(token != false ) {
    // if token is valid create a job with at teacher cmd and time
    let job = jobConstructor.createJob(token.teacher,req.body.cmd,req.body.time);
    console.log(job);
    //add job to the list of jobs
    jobList.AddJob(job);
    //respond to tell the server it worked
    res.status(200).send({message:"job recorded"})
    } else {
        //if there is a bad token respond with bad token
        res.status(401).send({message:"bad token"})
    }
});
module.exports = router;
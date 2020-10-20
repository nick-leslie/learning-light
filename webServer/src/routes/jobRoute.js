const express = require('express');
const router = express.Router();
//--------------------------------
const jobConstructor = require('../dataConstructors/jobConstructor');
const jobList = require('../state/jobState');
const tokenVerification = require('../verification/decryoptApiKey');
const statusState = require('../state/statusState');

// finish refactoring to post
router.post("/",(req,res)=> {
    // look up class using mac address
    console.log(req.body);
    let teacher = req.body.macAdress;
    console.log(teacher);
    let jobs = jobList.grabJob(teacher);
    // get it so there is a status state that store class and light status
    let status = req.body.status;
    statusState.maniplauteTeacherStatus(teacher,status);

    
    if(jobs != false) {
        jobs = jobs.data;
        console.log(jobs);
        res.status(200).send(jobs);
    } else {
        res.status(200).send({message:"no work"});
    }
});
router.post("/request",(req,res)=> {
    // have each requsetst pass in a token
    console.log(req.body);

    let token = tokenVerification.verifyFunc(req.body.token);
    if(token != false ) {
    let job = jobConstructor.createJob(token.teacher,req.body.cmd,req.body.time);
    jobList.AddJob(job);
    res.status(200).send({message:"job recorded"})
    } else {
        res.status(401).send({message:"bad token"})
    }
});
module.exports = router;
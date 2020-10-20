const express = require('express');
const router = express.Router();
const statusState = require('../state/statusState');
const tokenVerification = require('../verification/decryoptApiKey');

router.post('/',(req,res)=> {
    let token = req.body.token
    let teacher= tokenVerification.verifyFunc(token).teacher;
    if(tokenVerification != false) {
        res.status(200).send({message:"getting status", status:statusState.getTeacherStatus(teacher)})
    } else {
        res.status(401).send({message:"no token provided"});
    }

})

module.exports = router;
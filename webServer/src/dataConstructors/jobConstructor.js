

module.exports.createJob = (teacher,cmd,time) => {
    let job = 
    { 
       "teacher":teacher,
        "data":{
            "command":cmd,
            "timeing":time
        }
    }
    return job;
}
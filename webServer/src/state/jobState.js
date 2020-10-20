let jobs = []

module.exports.AddJob = (job) => {
    jobs.push(job);
    console.log(jobs);
}
module.exports.grabJob = (teacher) => {
    //console.log(classroom);
    if(jobs.length > 0) {
        let requestedJobs = [];
        for (let i = 0; i < jobs.length; i++) {
            const job = jobs[i];
            if(job.teacher == teacher) {
                requestedJobs.push(job);
            } 
        }
        if(requestedJobs.length > 0) {
        jobs.pop(requestedJobs[0]);
        console.log(requestedJobs[0]);
        return requestedJobs[0];
        } else {
            return false;
        }
    } else {
        return false;
    }
}
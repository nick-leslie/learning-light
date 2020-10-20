const { request } = require("express");

const jobsAssembly = require('../src/dataConstructors/jobConstructor');
let testJob = { 
    "teacher":"ciras",
     "data":{
         "command":"True",
         "timeing":3000
     }
 }
test('should assemble job', () => {
    expect(jobsAssembly.createJob("ciras","True",3000)).toStrictEqual(testJob);
  });
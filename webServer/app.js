//--------------------------------
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
//--------------------------------
const jobsRoute = require('./src/routes/jobRoute');
const loginRoute = require('./src/routes/roomLogin');
const statusRoute = require('./src/routes/statusRoute');
//-------------------------------
const roomState = require('./src/state/roomState');
const statusState = require('./src/state/statusState')
//--------------------------------
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// var myLogger = function (req, res, next) {
//     console.log('there is a request')
//     next()
// }
// app.use('/',myLogger);

app.use("/",express.static('./src/static'));
app.use("/jobs",jobsRoute);
app.use("/login",loginRoute);
app.use("/status",statusRoute);
onStartUp();
async function onStartUp() {
    await roomState.populateKeys();
    await statusState.populateStatus();
    //console.log(roomState.grabRoomKeys());
}

module.exports = app;
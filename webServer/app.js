//--------------------------------
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const helmet = require('helmet')
//--------------------------------
const jobsRoute = require('./src/routes/jobRoute');
const loginRoute = require('./src/routes/roomLogin');
const statusRoute = require('./src/routes/statusRoute');
const healthRoute = require ('./src/routes/healthRoute')
//-------------------------------
const roomState = require('./src/state/roomState');
const statusState = require('./src/state/statusState')
//--------------------------------
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(helmet());


app.use("/",express.static('./src/static'));
app.use("/jobs",jobsRoute);
app.use("/login",loginRoute);
app.use("/status",statusRoute);
app.use("/heatlth",healthRoute)
onStartUp();
async function onStartUp() {
    await console.log(roomState.setup());
    await statusState.populateStatus();
}

module.exports = app;
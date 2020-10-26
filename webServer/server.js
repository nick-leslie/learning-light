// we are using a seperet http server so latter on we can use https
const http = require('http');
const app = require("./app");
const { networkInterfaces } = require('os');
const https = require('https');
const fs = require('fs');

const options = {
  key: fs.readFileSync('./pem/key.pem'),
  cert: fs.readFileSync('./pem/cert.pem')
};

const port = process.env.port || 1234;//replace with an enviorment varuble
printLocalIp();

const server = http.createServer(app);
const httpsServer = https.createServer(options,app).listen(80);
console.log("server starting " + port);


server.listen(port)



function printLocalIp() 
{
    const nets = networkInterfaces();
    const results = Object.create(null); // or just '{}', an empty object

    for (const name of Object.keys(nets)) {
        for (const net of nets[name]) {
            // skip over non-ipv4 and internal (i.e. 127.0.0.1) addresses
            if (net.family === 'IPv4' && !net.internal) {
                if (!results[name]) {
                    results[name] = [];
                }

                results[name].push(net.address);
            }
        }
    }
    console.log(results);
}
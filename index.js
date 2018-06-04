const express = require('express');
const webpush = require('web-push');
const bodyParser = require('body-parser');
const path = require('path');

const app  = express();


// Set Static Path
app.use(express.static(path.join(__dirname, 'client')));

app.use(bodyParser.json());

const publicVapidKey = 'BMiFYSn16-nhu9dXOaiAhXo4Ro-h2lZ0CmZF5Ks5aX_uA02pUyBN0Ub-P5fG_UVbo_aIJ2BNyIFTfaRKG_9o8KQ';

const privateVapidKey = 'vOSWNfT-xdVGB54W72A7YHXsaiB476_mPhpFv8pvTLo';

webpush.setVapidDetails('mailto:saurabh@promaxevents.in',publicVapidKey,privateVapidKey);

// Subscribe Route
app.post('/subscribe', (req,res) => {
 // Get PushSubsciption object
 const subscription = req.body;

 // Send 201 - resource created
 res.status(201).json({});

 // Create Payload
 const payload = JSON.stringify({
     title: 'title push',
     body: "Saurabh Kashyap from Promax update",
     icon: "http://image.ibb.co/frYOFd/tmlogo.png"
 });

 // pass the object into sendNotification
 webpush.sendNotification(subscription,payload).catch( err => console.error(err));
});

const port = 5000;

app.listen(port , () => console.log(`server is running at port ${port}`));
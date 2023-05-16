const express = require('express');
const webpush = require('web-push');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

//set the static path
app.use(express.static(path.join(__dirname, "client")));
app.use(bodyParser.json())
const publicVapidKey = 'BGwDEWugwQqlJ9Y5t62koPU8OfKJkqF_pIXrN60iY96o2xCxfHA58Xr3KY8Ilzzi9L6zMp91ZwLfXL77Jo14Cvc';
const privateVapidKey = 'bxZvdBNRi507b6UC-BYqNc1Z_He4S62eqDK1DV2vkEA';

webpush.setVapidDetails('mailto:test@test.com', publicVapidKey, privateVapidKey);

//subscribe route
app.post('/subscribe', (req, res) => {
  //get push subscription object
  const subscription = req.body;

  //send status 201
  res.status(201).json({})

  //create paylod
  const payload = JSON.stringify({ title: 'Node Js Push Notification' });

  //pass the object into sendNotification
  webpush.sendNotification(subscription, payload).catch(err => console.error(err));
})

const port = 3000;
app.listen(port, () => {
  console.log(`server started on ${port}`)
});
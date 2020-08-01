// index.js

/**
 * Required External Modules
 */
const express = require("express");
const cors = require('cors');
const path = require("path");
var bodyParser = require('body-parser');
const Twilio = require("twilio");
var admin = require("firebase-admin");

var serviceAccount = require("./angufyrbse-app-4e675-firebase-adminsdk-si52y-bdb276a1b0.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://angufyrbse-app-4e675.firebaseio.com"
});

/**
 * App Variables
 */
const app = express();
const port = process.env.PORT || "8000";
//middleware
app.use(cors());
app.use(bodyParser.json()); //Accespt json params
app.use(bodyParser.urlencoded({ extended: true }));
/**
 *  App Configuration
 */

/**
 * Routes Definitions
 */
app.post('/sendMessage/', (req, res, next) => {
  //get post params
  var post_data = req.body; 
  var fname = post_data.usr_fname;
  var lname = post_data.usr_lname;
  var tel = post_data.usr_tel;


  // getting ready
  const twilioNumber = '+18573052371';
  const accountSid = 'ACb43150568429fac3440ea1cc0c177e9a';
  const authToken = 'b243e50ae301b54a411922e68059de2c';
  const client = Twilio(accountSid, authToken);

  // start sending message
  const phoneNumbers = [tel]

  phoneNumbers.map(phoneNumber => {
    console.log(phoneNumber);

    if (!validE164(phoneNumber)) {
      throw new Error('number must be E164 format!')
    }

    const textContent = {
      body: 'Hello ' + fname + ' ' + lname,
      to: phoneNumber,
      from: twilioNumber
    }

    client.messages.create(textContent)
      .then((message) => console.log(message.to), res.json(200))
  })


  // Validate E164 format
  function validE164(num) {
    return /^\+?[1-9]\d{1,14}$/.test(num)
  }
})

//send Push notification
app.post('/sendPush/', (req, res, next) => {
   //get post params
   var post_data = req.body; 
   var user_token = post_data.user_token; 
   var push_message = post_data.push_message;
   var push_title = post_data.push_title;

  const message = {
    notification:{
      title: push_title,
      body: push_message
    },
    token: user_token
  }
  admin.messaging().send(message)
  .then((response) => {
    console.log('Successfully sent message: ', response);
    res.json(200);
  })
  .catch((error) => {
    console.log('Error sending message: ', error);
  })   
})

/**
 * Server Activation
 */
app.listen(port, () => {
  console.log(`Listening to requests on http://localhost:${port}`)
})

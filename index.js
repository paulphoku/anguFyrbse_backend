// index.js

/**
 * Required External Modules
 */
const express = require("express");
const path = require("path");
var bodyParser = require('body-parser');
const Twilio = require("twilio");

/**
 * App Variables
 */
const app = express();
const port = process.env.PORT || "8000";
//middleware
app.use(bodyParser.json()); //Accespt json params
app.use(bodyParser.urlencoded({extended:true}));
/**
 *  App Configuration
 */

/**
 * Routes Definitions
 */
app.post('/sendMessage/', (req, res, next) => {
  //
  var post_data = req.body; //get post params
  var fname = post_data.usr_fname;
  var lname = post_data.usr_lname;
  var tel = post_data.usr_tel;

  
  // getting ready
  const twilioNumber = '+18573052371';
  const accountSid = 'ACb43150568429fac3440ea1cc0c177e9a';
  const authToken = '6e98104af7b3596787c114be87e7bec0';
  const client = Twilio(accountSid, authToken);

  // start sending message
  // function sendText() {
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
        .then((message) => console.log(message.to))
    })
  // }

  // Validate E164 format
  function validE164(num) {
    return /^\+?[1-9]\d{1,14}$/.test(num)
  }
})
/**
 * Server Activation
 */
app.listen(port, () => {
  console.log(`Listening to requests on http://localhost:${port}`);
});

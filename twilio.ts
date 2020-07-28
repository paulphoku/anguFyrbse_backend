// twilio.ts
/**
 * Typescript
 * Twilio version: ^3.15.0
 */
 
import * as Twilio from 'twilio';

// getting ready
const twilioNumber = '+18573052371';
const accountSid = 'ACb43150568429fac3440ea1cc0c177e9a';
const authToken = '6e98104af7b3596787c114be87e7bec0';

const client = Twilio(accountSid, authToken);

// start sending message

function sendText(){
    const phoneNumbers = [ '+27842929337']    

    phoneNumbers.map(phoneNumber => {
        console.log(phoneNumber);
        
        if ( !validE164(phoneNumber) ) {
            throw new Error('number must be E164 format!')
        }
    
        const textContent = {
            body: `You have a new sms from Dale Nguyen :)`,
            to: phoneNumber,
            from: twilioNumber
        }
    
        client.messages.create(textContent)
        .then((message) => console.log(message.to))
    })
}

// Validate E164 format
function validE164(num) {
    return /^\+?[1-9]\d{1,14}$/.test(num)
}
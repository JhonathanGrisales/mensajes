const express = require('express');
const mongoose = require('mongoose');
const sgMail = require('@sendgrid/mail');
const email = require('./src/email.sendgrid');
const app = express();
require('dotenv').config();
const port = process.env.PORT;
const routerApi = require('./src/routes');
const { errorhandler, logErrors } = require('./src/middlewares/error.handler');

app.listen(port, () => console.log('Connect in the port ', port));

/* mongoose
  .connect(process.env.MONGODB_CONNECTION_STRING)
  .then(() => console.log('Success connect with mongoDB'))
  .catch((error) => console.log(error)); */

/* ############### TWILIO ###################  */

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

client.messages
    .create({
        body: 'Prueba de envio de SMS con twilio UM.',
        from: '+16072846483',
        to: '+573113684257',
    })
    .then((message) => console.log(message.sid));

/* ############### TWILIO ###################3  */

sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const msg = {
    to: 'jgrisalesg@gmail.com', // Change to your recipient
    from: 'jgrisales85281@umanizales.edu.co', // Change to your verified sender
    subject: 'UM: Prueba envio de correo con sengrid',

    html: `<!DOCTYPE html>
  <html lang="en">
      <head>
          <meta charset="UTF-8" />
          <meta http-equiv="X-UA-Compatible" content="IE=edge" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>Document</title>
      </head>
      <body>
          <div><h3>Programas UM</h3></div>
          <div>
              <table>
                  <thead>
                      <tr>
                          <th>Programa</th>
                          <th>Codigo SNIES</th>
                          <th>Contenido</th>
                      </tr>
                  </thead>

                  <tbody>
                      <tr>
                          <td>Ing. Sistemas</td>
                          <td>1998</td>
                          <td>Lorem ipsum dolor sit.</td>
                      </tr>
                      <tr>
                          <td>Medicina</td>
                          <td>1422</td>
                          <td>Lorem ipsum dolor sit.</td>
                      </tr>
                      <tr>
                          <td>Psicologia</td>
                          <td>1423</td>
                          <td>Lorem ipsum dolor sit.</td>
                      </tr>
                  </tbody>
              </table>
              <div><img src="https://umanizales.edu.co/wp-content/uploads/2014/12/banner-1-1.png" width="500"  alt="" /></div>

          </div>
      </body>
  </html>
  `,
};
sgMail
    .send(msg)
    .then(() => {
        console.log('Email sent');
    })
    .catch((error) => {
        console.error(error);
    });

/*  */

/* Respuestas en formato JSON */
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.post('/api/email', async (req, res, next) => {
    try {
        res.json(await email.setOrder(req.body));
    } catch (error) {
        next(error);
    }
});
app.use(logErrors);
app.use(errorhandler);
routerApi(app);

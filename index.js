// server()
//   .use(bodyParser.json())
//   .use(bodyParser.urlencoded({ extended: false }))
//   .get("/", (req, res) =>
//     res.send(`Hi there! This is a nodejs-line-api running on PORT: ${PORT}`)
//   )
//   // เพิ่มส่วนของ Webhook เข้าไป
//   .post("/webhook", function(req, res) {
//     let replyToken = req.body.events[0].replyToken;
//     let msg = req.body.events[0].message.text;

//     console.log(`Message token : ${replyToken}`);
//     console.log(`Message from chat : ${msg}`);

//     res.json({
//       status: 200,
//       message: `Webhook is working!`
//     });
//   })
//   .listen(PORT, () => console.log(`Listening on ${PORT}`));
const server = require("express");
const PORT = process.env.PORT || 9999;
const request = require("request");
const bodyParser = require("body-parser");
const lineMessaging = require("./src/classes/line-messaging");

server()
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({ extended: false }))
  .get("/", (req, res) =>
    res.send(`Hi there! This is a nodejs-line-api running on PORT: ${PORT}`)
  )
  .post("/webhook", function(req, res) {
    let replyToken = req.body.events[0].replyToken;
    let message = req.body.events[0].message.text;

    console.log(`Message token : ${replyToken}`);
    console.log(`Message from chat : ${message}`);

    lineMessaging.replyMessage(replyToken, message).then(function(rs) {
      console.log(`Reply message result : ${rs}`);

      res.json({
        status: 200,
        message: `Sent message!`
      });
    });
  })
  .post("/dialog", function(req, res) {
    console.log(req);
    res.json({
      status: 200,
      message: "thx"
    });
    // "use strict";

    // const functions = require("firebase-functions");
    // const { WebhookClient } = require("dialogflow-fulfillment");
    // const { Card, Suggestion } = require("dialogflow-fulfillment");

    // process.env.DEBUG = "dialogflow:debug"; // enables lib debugging statements

    // exports.dialogflowFirebaseFulfillment = functions.https.onRequest(
    //   (request, response) => {
    //     const agent = new WebhookClient({ request, response });
    //     console.log(
    //       "Dialogflow Request headers: " + JSON.stringify(request.headers)
    //     );
    //     console.log("Dialogflow Request body: " + JSON.stringify(request.body));

    //     function welcome(agent) {
    //       agent.add(`Welcome to my agent!`);
    //     }

    //     function fallback(agent) {
    //       agent.add(`I didn't understand`);
    //       agent.add(`I'm sorry, can you try again?`);
    //     }
    //     let intentMap = new Map();
    //     intentMap.set("Default Welcome Intent", welcome);
    //     intentMap.set("Default Fallback Intent", fallback);

    //     agent.handleRequest(intentMap);
    //   }
    // );
  })
  .listen(PORT, () => console.log(`Listening on ${PORT}`));

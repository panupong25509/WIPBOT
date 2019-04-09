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
    runSample();
    res.json({
      status: 200,
      message: "Hi"
    });
  })

  .post("/dialog", function(req, res) {
    console.log(req);
    const dialogflow = require("dialogflow");
    const uuid = require("uuid");

    /**
     * Send a query to the dialogflow agent, and return the query result.
     * @param {string} projectId The project to be used
     */
    async function runSample(projectId = "checkchick") {
      // A unique identifier for the given session
      const sessionId = uuid.v4();

      // Create a new session
      const sessionClient = new dialogflow.SessionsClient();
      const sessionPath = sessionClient.sessionPath(projectId, sessionId);

      // The text query request.
      const request = {
        session: sessionPath,
        queryInput: {
          text: {
            // The query to send to the dialogflow agent
            text: "where",
            // The language used by the client (en-US)
            languageCode: "en-US"
          }
        }
      };

      // Send request and log result
      const responses = await sessionClient.detectIntent(request);
      console.log("Detected intent");
      const result = responses[0].queryResult;
      console.log(`  Query: ${result.queryText}`);
      console.log(`  Response: ${result.fulfillmentText}`);
      if (result.intent) {
        console.log(`  Intent: ${result.intent.displayName}`);
      } else {
        console.log(`  No intent matched.`);
      }
    }
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

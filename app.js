//jshint esversion: 6
const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const app = express();
const twilio = require("twilio");
const CronJob = require("cron").CronJob;
const dotenv = require("dotenv");
const finnhub = require("finnhub");

app.use(express.static("public"));
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

dotenv.config();

const cronTime = "* * * * *";
const client = twilio(process.env.ACCOUNTSID, process.env.AUTHTOKEN);

const api_key = finnhub.ApiClient.instance.authentications["api_key"];
api_key.apiKey = process.env.FINNHUBAPIKEY;
const finnhubClient = new finnhub.DefaultApi();

let prices = [];

// for (let i = 0; i < 3; i++) {
// }

// finnhubClient.quote("FTRP", (error, data, response) => {
//   prices.push(data.c);
//   console.log("third " + prices);
//   client.messages.create({
//     to: process.env.YOURPHONENUMBER,
//     from: process.env.YOURTWILIOPHONENUMBER,
//     body:
//       // prettier-ignore
//       "- - - - - - - - - - - - -\n\n" +
//       "BABA cost 146.70 close " + prices[0] + "\n\n" +
//       "MNKD cost 4.991 close " + prices[1] + "\n\n" +
//       "FTRP cost 2.394 close " + prices[2] +"\n\n" +
//       "- - - - - - - - - - - - - - - - - - -",
//   });
// });

const jobBaba = new CronJob(
  cronTime,
  function () {
    finnhubClient.quote("BABA", (error, data, response) => {
      //prices.push(data.c);
      console.log(error);
      console.log(data);
      console.log(response);
      client.messages.create({
        to: process.env.YOURPHONENUMBER,
        from: process.env.YOURTWILIOPHONENUMBER,
        body:
          // prettier-ignore
          "- - - - - - - - - - - - -\n\n" +
      "BABA close " + data.c + " cost 146.70" + "\n\n" +
      "- - - - - - - - - - - - - - - - - - -",
      });
    });

    // setTimeout(() => {
    //   console.log("Waiting 1 second");
    // }, 1000);

    finnhubClient.quote("MNKD", (error, data, response) => {
      //prices.push(data.c);
      //console.log("second" + prices);
      client.messages.create({
        to: process.env.YOURPHONENUMBER,
        from: process.env.YOURTWILIOPHONENUMBER,
        body:
          // prettier-ignore
          "- - - - - - - - - - - - -\n\n" +
      "MNKD close " + data.c + " cost 4.991"+ "\n\n" +
      "- - - - - - - - - - - - - - - - - - -",
      });
    });

    // setTimeout(() => {
    //   console.log("Waiting 1 second");
    // }, 1000);

    finnhubClient.quote("FTRP", (error, data, response) => {
      //prices.push(data.c);
      //console.log("third " + prices);
      //
      client.messages.create({
        to: process.env.YOURPHONENUMBER,
        from: process.env.YOURTWILIOPHONENUMBER,
        body:
          // prettier-ignore
          "- - - - - - - - - - - - -\n\n" +
      "FTRP close " + data.c + " cost 2.394" +"\n\n" + 
      "- - - - - - - - - - - - - - - - - - -",
      });
    });
  },
  null,
  true,
  "America/New_York"
);

// const jobMnkd = new CronJob(
//   cronTime,
//   function () {
//     const api_key = finnhub.ApiClient.instance.authentications["api_key"];
//     api_key.apiKey = process.env.FINNHUBAPIKEY;
//     const finnhubClient = new finnhub.DefaultApi();

//     finnhubClient.quote("MNKD", (error, data, response) => {
//       client.messages.create({
//         to: process.env.YOURPHONENUMBER,
//         from: process.env.YOURTWILIOPHONENUMBER,
//         body: "MNKD cost/share 4.991 close " + data.c,
//       });
//     });
//   },
//   null,
//   true,
//   "America/New_York"
// );

// const jobFtrp = new CronJob(
//   cronTime,
//   function () {
//     const api_key = finnhub.ApiClient.instance.authentications["api_key"];
//     api_key.apiKey = process.env.FINNHUBAPIKEY;
//     const finnhubClient = new finnhub.DefaultApi();

//     finnhubClient.quote("FTRP", (error, data, response) => {
//       client.messages.create({
//         to: process.env.YOURPHONENUMBER,
//         from: process.env.YOURTWILIOPHONENUMBER,
//         body: "Ftrp cost/share 2.394 close " + data.c,
//       });
//     });
//   },
//   null,
//   true,
//   "America/New_York"
// );

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", function (req, res) {
  var firstName = req.body.fName;
  var lastName = req.body.lName;
  var email = req.body.email;

  var data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName,
        },
      },
    ],
  };

  var jsonData = JSON.stringify(data);

  var option = {
    url: "https://us4.api.mailchimp.com/3.0/lists/112fb13eb0",
    method: "POST",
    headers: {
      Authorization: "justin1 <<<<<<<<<<API KEY>>>>>>>>>",
    },
    body: jsonData,
  };

  request(option, function (error, response, body) {
    if (error) {
      res.sendFile(__dirname + "failure.html");
    } else {
      if (response.statusCode === 200) {
        res.sendFile(__dirname + "/success.html");
      } else {
        res.sendFile(__dirname + "/failure.html");
      }
    }
  });
});

app.post("/failure", function (req, res) {
  res.redirect("/");
});

app.listen(process.env.PORT || 3000, function () {
  console.log("sever is running on port 3000");
});

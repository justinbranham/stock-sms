//jshint esversion: 6
const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const app = express();
const twilio = require("twilio");
const CronJob = require("cron").CronJob;
const dotenv = require("dotenv");

app.use(express.static("public"));
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

dotenv.config();

const cronTime = "1 17 * * *";
const client = twilio(process.env.ACCOUNTSID, process.env.AUTHTOKEN);

// const jobSpy = new CronJob(
//   cronTime,
//   function(){
//     request.get({
//       url: 'https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=SPY&apikey='+ process.env.ALPHAVANTAGEKEY,
//       json: true,
//       headers: {'User-Agent': 'request'}
//     }, (err, res, data) => {
//       if (err) {
//         console.log('Error:', err);
//       } else if (res.statusCode !== 200) {
//         console.log('Status:', res.statusCode);
//       } else {
//         // data is successfully parsed as a JSON object
//         const close = String(Object.values(Object.values(Object.values(data)[1])[0])[3]);
//         console.log(close);
//         client.messages.create ({
//           to: process.env.YOURPHONENUMBER,
//           from: process.env.YOURTWILIOPHONENUMBER,
//           body: 'SPY ' + close
//         });
//       }
//     });

//   },
// null,
// true,
// 'America/New_York'
// );

const jobBaba = new CronJob(
  cronTime,
  function () {
    request.get(
      {
        url:
          "https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=BABA&apikey=" +
          process.env.ALPHAVANTAGEKEY,
        json: true,
        headers: { "User-Agent": "request" },
      },
      (err, res, data) => {
        if (err) {
          console.log("Error:", err);
        } else if (res.statusCode !== 200) {
          console.log("Status:", res.statusCode);
        } else {
          // data is successfully parsed as a JSON object
          const close = String(
            Object.values(Object.values(Object.values(data)[1])[0])[3]
          );
          console.log(close);
          client.messages.create({
            to: process.env.YOURPHONENUMBER,
            from: process.env.YOURTWILIOPHONENUMBER,
            body: "BABA cost/share 146.70 close " + close,
          });
        }
      }
    );
  },
  null,
  true,
  "America/New_York"
);

const jobMnkd = new CronJob(
  cronTime,
  function () {
    request.get(
      {
        url:
          "https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=MNKD&apikey=" +
          process.env.ALPHAVANTAGEKEY,
        json: true,
        headers: { "User-Agent": "request" },
      },
      (err, res, data) => {
        if (err) {
          console.log("Error:", err);
        } else if (res.statusCode !== 200) {
          console.log("Status:", res.statusCode);
        } else {
          // data is successfully parsed as a JSON object
          const close = String(
            Object.values(Object.values(Object.values(data)[1])[0])[3]
          );
          console.log(close);
          client.messages.create({
            to: process.env.YOURPHONENUMBER,
            from: process.env.YOURTWILIOPHONENUMBER,
            body: "MNKD cost/share 4.991 close " + close,
          });
        }
      }
    );
  },
  null,
  true,
  "America/New_York"
);

const jobFtrp = new CronJob(
  cronTime,
  function () {
    request.get(
      {
        url:
          "https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=FTRP&apikey=" +
          process.env.ALPHAVANTAGEKEY,
        json: true,
        headers: { "User-Agent": "request" },
      },
      (err, res, data) => {
        if (err) {
          console.log("Error:", err);
        } else if (res.statusCode !== 200) {
          console.log("Status:", res.statusCode);
        } else {
          // data is successfully parsed as a JSON object
          const close = String(
            Object.values(Object.values(Object.values(data)[1])[0])[3]
          );
          console.log(close);
          client.messages.create({
            to: process.env.YOURPHONENUMBER,
            from: process.env.YOURTWILIOPHONENUMBER,
            body: "FTRP cost/share 2.394 close " + close,
          });
        }
      }
    );
  },
  null,
  true,
  "America/New_York"
);

// const jobIcpt = new CronJob(
//   cronTime,
//   function(){
//     request.get({
//       url: 'https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=ICPT&apikey='+ process.env.ALPHAVANTAGEKEY,
//       json: true,
//       headers: {'User-Agent': 'request'}
//     }, (err, res, data) => {
//       if (err) {
//         console.log('Error:', err);
//       } else if (res.statusCode !== 200) {
//         console.log('Status:', res.statusCode);
//       } else {
//         // data is successfully parsed as a JSON object
//         const close = String(Object.values(Object.values(Object.values(data)[1])[0])[3]);
//         client.messages.create ({
//           to: process.env.YOURPHONENUMBER,
//           from: process.env.YOURTWILIOPHONENUMBER,
//           body: 'ICPT ' + close
//         });
//       }
//     });

//   },
// null,
// true,
// 'America/New_York'
// );

// function getBabaData(){
//         const babaUrl = 'https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=BABA&apikey='+ process.env.ALPHAVANTAGEKEY;

//         request.get({
//             url: babaUrl,
//             json: true,
//             headers: {'User-Agent': 'request'}
//           }, (err, res, data) => {
//             if (err) {
//               console.log('Error:', err);
//             } else if (res.statusCode !== 200) {
//               console.log('Status:', res.statusCode);
//             } else {
//               // data is successfully parsed as a JSON object:
//               const babaClose = String(Object.values(Object.values(Object.values(data)[1])[0])[3]);
//               console.log(babaClose)
//               return babaClose;
//             }
//         });
// }

// let getBabaDataOutput = getBabaData();
// console.log(getBabaDataOutput);

// const mnkdUrl = 'https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=MNKD&apikey='+ process.env.ALPHAVANTAGEKEY;
//
// request.get({
//     url: mnkdUrl,
//     json: true,
//     headers: {'User-Agent': 'request'}
//   }, (err, res, data) => {
//     if (err) {
//       console.log('Error:', err);
//     } else if (res.statusCode !== 200) {
//       console.log('Status:', res.statusCode);
//     } else {
//       // data is successfully parsed as a JSON object:
//       const mnkdClose = Object.values(Object.values(Object.values(data)[1])[0])[3];
//       //console.log(mnkdClose);
//     }
// });

// const spyUrl = 'https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=SPY&apikey='+ process.env.ALPHAVANTAGEKEY;

// request.get({
//     url: spyUrl,
//     json: true,
//     headers: {'User-Agent': 'request'}
//   }, (err, res, data) => {
//     if (err) {
//       console.log('Error:', err);
//     } else if (res.statusCode !== 200) {
//       console.log('Status:', res.statusCode);
//     } else {
//       // data is successfully parsed as a JSON object:
//       const spyClose = Object.values(Object.values(Object.values(data)[1])[0])[3];
//       //console.log(spyClose);
//       return spyClose;
//     }
// });

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

// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();
//var validateDate = require("validate-date");
// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

app.get("/api/", (req, res)=> {

        let date_ob = new Date();
        let date = ("0" + date_ob.getDate()).slice(-2);
        let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
        let year = date_ob.getFullYear();
        let hours = date_ob.getHours();
        let minutes = date_ob.getMinutes();
        let seconds = date_ob.getSeconds();

       let new_dateE = new Date(year + "-" + month + "-" + date+ " " + hours + ":" + minutes + ":" + seconds);
       let unixE = new_dateE.getTime();
       let utcE = new_dateE.toUTCString();
       res.json({ "unix": unixE,"utc": utcE})

})


app.get('/api/:date_string?', (req, res) => {
  const dateString = req.params.date_string;

  // dateString starts with 5 digits, treat it as timestamp
  if (/^\d{5,}/.test(dateString)) {
    const timestamp = +dateString;

    return res.json({
      unix: timestamp,
      utc: new Date(timestamp).toUTCString(),
    });
  }

  // Try to convert dateString to Date object
  const dateObj = new Date(dateString);

  // Invalid format provided
  if (dateObj.toString() === 'Invalid Date') {
    return res.json({ error: 'Invalid Date' });
  }

  // Correct format, return values for given date
  return res.json({
    unix: dateObj.getTime(),
    utc: dateObj.toUTCString(),
  });
});







// app.get("/api/:input", (req, res)=>{
//     const user_input = req.params.input;
 
//     let new_date = new Date(user_input);
//     if(user_input=="1451001600000"){

//        let new_input = "1451001600000";
//        let new_dates = new Date("2015-12-25");
//        let unixs = new_dates.getTime();
//        let utcs = new_dates.toUTCString();
//        res.json({"user_input": new_input, "unix": unixs, "utc": utcs})
     
//     }else if(user_input=="2015-12-25"){
//     let unix = new_date.getTime();
//     let utc = new_date.toUTCString();
//     res.json({"user_input": user_input, "unix": unix, "utc": utc})
//     }else{
//        res.send({ error : "Invalid Date333" });
//     }
// })


// app.get("/api/:date", function (req, res) {
//   let date_string = req.params.date;
//   let date;

//   // Create a js date if it is passed in year-month-day format
//   if (date_string.includes("-")) {
//     date = new Date(date_string);
//   }
//   // Create a js date if it is passed in unix format
//   else {
//     let millisecondDate_string = parseInt(date_string); // First convert data_string to milliseconds (needs to be converted into a number as Date() will only accept unix as a number)
//     date = new Date(millisecondDate_string); // Set the date in variable
//   }

//   // Handles if date input is invalid
//   if (date == "Invalid Date") {
//     res.json({ error: "Invalid Date" });
//   }

//   // Handles if date is valid
//   else {
//     res.json({
//       unix: date.valueOf(), 
//       utc: date.toUTCString(), 
//     });
//   }
// });


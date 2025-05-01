// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

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
app.get("/api/:date_string", function (req, res) {
  let date_string = req.params.date_string
  if(!isNaN(date_string)){
    const timeinsec = Number(date_string)
    date = new Date(timeinsec < 1e12 ? timeinsec * 1000 : timeinsec)
    //This works only because JavaScript will implicitly create a global variable when you assign a value to an undeclared variable (i.e., not using let, const, or var) — but only in non-strict mode.
    //date becomes a global variable, even if you're inside a function. This can lead to hard-to-debug issues and conflicts.
    // It's not allowed in strict mode ('use strict';) — which is recommended for safer, cleaner code.
  }
  else {
    date = new Date(date_string);
  }
  if(isNaN(date.getTime())){
    res.json({unix:'invalid',utc:"invalid_date"})
  }
  res.json({
    unix: date.getTime(),
    utc: date.toUTCString()
  });
});



// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

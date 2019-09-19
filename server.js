// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

const testDate = (date) => date instanceof Date && !isNaN(date);

const validObj = {
  "unix": null,
  "utc": null
};

const invalidObj = {
  "error": "Invalid Date"
};

app.get("/api/timestamp/:date_string?", (req, res) => {
  const date =
        req.params.date_string === undefined ?
          new Date() :
          new Date(req.params.date_string);
  
  if (testDate(date)) {
    validObj["unix"] = date.getTime();
    validObj["utc"] = date.toUTCString();
    res.json(validObj);
  } else {
    res.json(invalidObj);
  }
  
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

//NODE JS code for selecting all country list
//Author-Vishnu,Date-03-08-2022

const express = require("express");
const app = express();
var bodyParser = require("body-parser");
var mysql = require("mysql");
app.use(bodyParser.json());
const port = 3000;
//Establishing MYSQL connection
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "ecommerceweb",
});
//Checking Connection
con.connect(function (err) {
  if (err) {
    return console.error("error: " + err.message);
  }

  console.log("Connected to the MySQL server.");
});
//API packages-REQ,RES
app.get("/countryselect", function (req, res) {
con.query("select id,txtCountryName from tblcountry",function (err,result, fields)
  {
    if (err) {
      return next(err);
    }
    res.send(view={"status":"succes",
    "values":result});
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
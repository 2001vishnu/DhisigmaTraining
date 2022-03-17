

const express = require("express");
const app = express();
var bodyParser = require("body-parser");
var mysql = require("mysql");
const res = require("express/lib/response");
app.use(bodyParser.json());
const port = 3000;

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "ecommerceweb",
});

con.connect(function (err) {
  if (err) {
    return console.error("error: " + err.message);
  }
  console.log("Connected to the MySQL server.");
});

app.post("/stateselect", function (req, res) {
  var refCountryName = req.body.values.countryid;
  console.log(refCountryName);
  var sql ="SELECT s.id, s.txtStateName, c.txtCountryName FROM tblState s JOIN tblcountry c ON c.id =s.refCountryName WHERE refCountryName = ?";
  con.query(sql, refCountryName, function (err, result, fields) {
    if (err) {
      return next(err);
    }
    res.send((view = { status: "succes", values: result }));
  });
});

app.get("/countryselect", function (req, res) {
  console.log(req.body.task);
  res.send({ data: "user created in db" });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

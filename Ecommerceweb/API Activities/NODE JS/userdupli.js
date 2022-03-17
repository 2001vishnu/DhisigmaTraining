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

app.post("/userdupli", function (req, res) {
  var username = req.body.values.txtUsername;
  if (username == "") {
    res.send("username is empty");
    return;
  }

  con.connect(function (err) {
    if (err) {
      return console.error("error: " + err.message);
    }
  });
  con.query("SELECT id FROM tblusers WHERE txtUsername = ?",
    [username],
    function (err, result, fields) {
      if (err) {
       res.send(err);
      } else {
        res.send((view = { status: "duplicate exisxts", values: result }));
      }
    }
  );
  con.end();
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

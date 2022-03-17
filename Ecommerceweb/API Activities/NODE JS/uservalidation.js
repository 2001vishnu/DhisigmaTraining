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

app.post("/uservalidation", function (req, res) {
  var username = req.body.values.txtUsername;
  var pswd = req.body.values.txtPassword;
  if (username == "") {
    res.send("username is empty");
    return;
  }
  if (pswd == "") {
    res.send("password is empty");
    return;
  }


  con.connect(function (err) {
    if (err) {
      return console.error("error: " + err.message);
    }
  });
  con.query("SELECT u.txtUsername,u.txtPassword,u.txtFirstName,u.txtLastName,t.txtUserType FROM tblusers u JOIN tblusertype t ON u.refUserType = t.id WHERE u.txtUsername = ? AND u.txtPassword = ?",[username, pswd],
    function (err, result, fields) {
      if (err) {
        res.send(err);
      }
      else {
        res.send((view = { status: "success", values: result }));
      }
    }
  );
  con.end();
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

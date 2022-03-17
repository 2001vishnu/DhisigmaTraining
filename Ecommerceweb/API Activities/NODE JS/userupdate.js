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

app.post("/userupdate", function (req, res) {
  var id = req.body.values.id;
  var username = req.body.values.txtUsername;
  var pswd = req.body.values.txtPassword;
  var phone = req.body.values.txtPhoneNo;
  var firstnm = req.body.values.txtFirstName;
  var lastname = req.body.values.txtLastName;
  var countrynam = req.body.values.refCountryName;
  var statenam = req.body.values.refStateName;
  var addr = req.body.values.txtAddress;
  var street = req.body.values.txtStreet;
  var city = req.body.values.txtCity;
  var pin = req.body.values.txtPincode;
  var website = req.body.values.txtWebsite;

  if (username == "") {
    res.send("username is empty");
    return;
  }
  if (pswd == "") {
    res.send("password is empty");
    return;
  }
  if (phone == "") {
    res.send("phoneno is empty");
    return;
  }

  con.connect(function (err) {
    if (err) {
      return console.error("error: " + err.message);
    }
  });
  con.query(
    "UPDATE tblusers SET txtUsername=?,txtPassword=?,txtFirstName=?,txtLastName=?,refCountryName=?,refStateName=?,txtAddress=?,txtStreet=?,txtCity=?,txtPincode=?,txtPhoneNo=?,txtWebsite=? WHERE id=? ",
    [username, pswd,firstnm,lastname,countrynam,statenam,addr,street,city,pin,phone,website,id],
    function (err, result, fields) {
      if (err) {
        if (err.errno == 1062)
          res.send((view = { status: "error", values: "Duplicate entry!" }));
        else res.send(err);
      } else {
        res.send((view = { status: "succes", values: result }));
      }
    }
  );
  con.end();
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

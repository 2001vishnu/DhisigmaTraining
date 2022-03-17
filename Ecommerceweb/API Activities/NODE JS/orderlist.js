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

app.post("/orderlist", function (req, res) {
  var id = req.body.values.id;
  if (id == "") {
    res.send("id is empty");
    return;
  }
  

  con.connect(function (err) {
    if (err) {
      return console.error("error: " + err.message);
    }
  });
  con.query("select  t.id,u.txtUsername,t.txtOrderNo,t.txtOrderAmount,u.txtAddress, u.txtPincode from tblorderhead t join tblusers u on t.refUserName=u.id where u.id=?",[id],
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


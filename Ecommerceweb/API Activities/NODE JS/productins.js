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

app.post("/productins", function (req, res) {
  var productname = req.body.values.txtProdName;
  var prodprice = req.body.values.txtProdPrice;
  var prodcat = req.body.values.refProdCategory;
  var id=req.body.values.id;
  if (productname == "") {
    res.send("productname is empty");
    return;
  }
  if ( prodprice== "") {
    res.send("prodprice is empty");
    return;
  }
  if (prodcat == "") {
    res.send("prodcat is empty");
    return;
  }

  con.connect(function (err) {
    if (err) {
      return console.error("error: " + err.message);
    }
  });
  con.query(
    "INSERT INTO tblproduct (id,txtProdName,txtProdPrice,refProdCategory)  VALUES (?,?,?,?)",
    [id,productname,prodprice ,prodcat ],
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

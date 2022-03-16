var mysql = require("mysql");
var connection = mysql.createConnection({
  host: "database-2.cprzfqcrfdkr.us-east-1.rds.amazonaws.com",
  user: "admin",
  password: "password",
  database: "ecommerceweb",
});
// console.log(connection);
exports.handler = (event, context, callback) => {
  const parsedBody = JSON.parse(event.body); // should wrap in try/catch
  const txtUsername = parsedBody.values.txtUsername;

  const txtPassword = parsedBody.values.txtPassword;

  const txtFirstName = parsedBody.values.txtFirstName;

  const txtLastName = parsedBody.values.txtLastName;

  const refCountryName = parsedBody.values.refCountryName;

  const refStateName = parsedBody.values.refStateName;

  const txtAddress = parsedBody.values.txtAddress;

  const txtStreet = parsedBody.values.txtStreet;

  const txtCity = parsedBody.values.txtCity;

  const txtPincode = parsedBody.values.txtPincode;

  const txtPhoneNo = parsedBody.values.txtPhoneNo;
  const txtWebsite = parsedBody.values.txtWebsite;
  const bIsRegirtered = parsedBody.values.bIsRegirtered;
  const dtCreatedOn = parsedBody.values.dtCreatedOn;

  const dtUpdatedOn = parsedBody.values.dtUpdatedOn;

  const bDeleteFlag = parsedBody.values.bDeleteFlag;
  if (txtUsername == "") {
    callback("username is empty");
    return;
  }
  if (txtPassword == "") {
    callback("password is empty");
    return;
  }
  connection.query(
    "INSERT INTO tblUsers (txtUsername,txtPassword,txtFirstName,txtLastName,refCountryName,refStateName,txtAddress,txtStreet,txtCity,txtPincode,txtPhoneNo,txtWebsite,bIsRegirtered,dtCreatedOn,dtUpdatedOn,bDeleteFlag)VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
    [
      txtUsername,
      txtPassword,
      txtFirstName,
      txtLastName,
      refCountryName,
      refStateName,
      txtAddress,
      txtStreet,
      txtCity,
      txtPincode,
      txtPhoneNo,
      txtWebsite,
      bIsRegirtered,
      dtCreatedOn,
      dtUpdatedOn,
      bDeleteFlag,
    ],
    function (error, results, fields) {
      if (error) {
        connection.destroy();
        throw error;
      } else {
        // connected!
        console.log(results);

        callback(error, { status: "succes", values: results });
        connection.end(function (err) {
          callback(err, results);
        });
      }
    }
  );
};

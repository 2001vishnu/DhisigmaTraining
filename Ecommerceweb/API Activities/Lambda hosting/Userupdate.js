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
  const id = parsedBody.values.id;
  const txtStreet = parsedBody.values.txtStreet;
  const txtUsername = parsedBody.values.txtUsername;
  const txtFirstName = parsedBody.values.txtFirstName;
  const txtLastName = parsedBody.values.txtLastName;
  const txtPassword = parsedBody.values.txtPassword;
  const txtAddress = parsedBody.values.txtAddress;
  const txtCity = parsedBody.values.txtCity;
  const txtPincode = parsedBody.values.txtPincode;
  const txtPhoneNo = parsedBody.values.txtPhoneNo;
  const txtWebsite = parsedBody.values.txtWebsite;

  connection.query(
    "UPDATE tblUsers SET txtUsername =?,txtPassword=?,txtFirstName=?,txtLastName=?,txtAddress=?,txtStreet=?,txtCity=?,txtPincode=?,txtPhoneNo=?,txtWebsite=? WHERE id=?",
    [
      txtUsername,
      txtPassword,
      txtFirstName,
      txtLastName,
      txtAddress,
      txtStreet,
      txtCity,
      txtPincode,
      txtPhoneNo,
      txtWebsite,
      id,
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

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
  connection.query(
    "SELECT  u.txtUsername,u.txtPassword,u.txtFirstName,u.txtLastName,t.txtUserType FROM tblUsers u JOIN tblUserType t ON u.refUserType = t.id WHERE u.txtUsername =? AND u.txtPassword = ?",
    [txtUsername, txtPassword],
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

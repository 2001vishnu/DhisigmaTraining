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

  connection.query(
    "select  t.id,u.txtUsername,t.txtOrderNo,t.txtOrderAmount,u.txtAddress,u.txtPincode from tblOrderHead t join tblUsers u on t.refUserName=u.id where t.id=?",
    [id],
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

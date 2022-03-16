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
  const data = parsedBody.values.refCountryName; // 'world'
  connection.query(
    "SELECT s.id, s.txtStateName, c.txtCountryName FROM tblState s JOIN tblCountry c ON c.id =s.refCountryName WHERE s.refCountryName = ?",
    [data],
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

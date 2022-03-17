var mysql = require('mysql');


var connection = mysql.createConnection({
    host: "database-1.cq6avrntdh5x.ap-south-1.rds.amazonaws.com",
    user: "admin",
    password: "jenysdatabase",
    database: "ecommerceweb"
}); 

exports.handler = (event, context, callback) =>{
    var data = JSON.parse(event.body);
    var name = data.txtUsername;
    var pass = data.txtPassword;
    var fname = data.txtFirstName;
    var lname = data.txtLastName;
    var country = data.refCountry;
    var state = data.refState;
    var address = data.txtAddress;
    var street = data.txtStreet;
    var city = data.txtCity;
    var pin = data.txtPinCode;
    var phone = data.txtPhoneNo;
    var web = data.txtWebsite;
    var utype = data.refUserType;
	
	if (name.length == 0) {
        callback("username is empty")
        return;
    }
    if (pass.length == 0) {
        callback("password is empty")
        return;
    }
    if (fname.length == 0) {
        callback("firstname is empty")
        return;
    }
    if (lname.length == 0) {
        callback("lastname is empty")
        return;
    }
    if (country.length == 0) {
        callback("country is empty")
        return;
    }
    if (state.length == 0) {
        callback("state is empty")
        return;
    }
    if (address.length == 0) {
        callback("address is empty")
        return;
    }
    if (street.length == 0) {
        callback("street is empty")
        return;
    }
    if (city.length == 0) {
        callback("city is empty")
        return;
    }
    if (pin.length == 0) {
        callback("pincode is empty")
        return;
    }
    if (phone.length == 0) {
        callback("phone is empty")
        return;
    }
    if (web.length == 0) {
        callback("website is empty")
        return;
    }
    if (utype.length == 0) {
        callback("Type is empty")
        return;
    }
    
    connection.query("insert into tblUsers (txtUsername,txtPassword,txtFirstName,txtLastName,refUserType,refCountry,refState,txtAddress,txtStreet,txtCity,txtPinCode,txtPhoneNo,txtWebsite) values (?,?,?,?,?,?,?,?,?,?,?,?,?);",[name,pass,fname,lname,utype,country,state,address,street,city,pin,phone,web], function (error, result, fields){
        if (error){
			if(error.errno==1064)
                {
                    callback((view = {
                        "status": "error",
                        "values": "user already exists"
                    }));
                }
                else callback(error);
            callback(error,result);
            connection.destroy();
            throw error;
        }
        else {
           
            callback(error, result);
            connection.end(function (error) { callback(error, result);});
              
        }});
    
 };
 
 
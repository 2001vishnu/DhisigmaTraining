import Heading from "./Heading";
import { Button, Row, Col } from "react-bootstrap";
import { Link , useHistory } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./style.css";
import { useEffect, useState } from "react";
import React from "react";
import axios from "axios";

function App() {
  const response = {
    status: "succes",
    values: [],
  };
  const history=useHistory();
  const [countrylist, setCountryList] = useState([]);
  const [statelist, setStateList] = useState([]);
  const [FirstName, setFirstName] = useState("");
  const [Password,setPassword]=useState("");
  const [Lastname, setLastname] = useState("");
  const [Address, setAddress] = useState("");
  const [City, setCity] = useState("");
  const [Street, setStreet] = useState("");
  const [Pin, setPin] = useState("");
  const [Phone, setPhone] = useState("");
  const [Email, setEmail] = useState("");
  const[Username,setUsername]=useState("");
  const [Country, setCountry] = useState("");
  const [State, setState] = useState("");
  const handleSelect = (e) => {
    console.log(e);
    setCountry(e);
  };

  
  function test() {
    console.log({
      FirstName: FirstName,
      Lastname: Lastname,
      Address: Address,
      
      City: City,
      Pin: Pin,
      Phone: Phone,
      Email,
    });
  }

  const handleSignupClick=()=>{
    console.log("testing");
    let url = "https://kfzvvp3yx1.execute-api.us-east-1.amazonaws.com/userinsert";
    let dd='{"task":"userinsert","values":{"txtUsername":'+Username+',"txtPassword":'+Password+',"txtFirstName":'+FirstName+',"txtLastName":'+Lastname+',"refCountryName":'+Country+',"refStateName":'+State+',"txtAddress":'+Address+',"txtStreet":'+Street+',"txtCity":'+City+',"txtPincode":'+Pin+',"txtPhoneNo":'+Phone+',"txtWebsite":'+Email+',"bIsRegirtered":"1","dtCreatedOn":"2022-03-03","dtUpdatedOn":"2022-03-03","bDeleteFlag":"0"}}';
    axios
      .post(url, dd)
      .then((response) => {
        console.log(response);
        history.push("/Login")
      })
      .catch((error) => {
        console.log(error);
      });
    
  }

  const handleClick = () => {
    console.log("testing");
    let url = "https://js9bf2qpc4.execute-api.us-east-1.amazonaws.com/country";
    axios
      .post(url, '{"task":"countryselect"}')
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    let url = "https://js9bf2qpc4.execute-api.us-east-1.amazonaws.com/country";
    axios
      .post(url, '{"task":"countryselect"}')
      .then((response) => {
        console.log(JSON.stringify(response.data));
        // alert(response)
        setCountryList(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  const handleOnChange1 = (e) => {
    //alert(e.target.value);
    const index1 = e.target.selectedIndex;
    const optionElement1 = e.target.childNodes[index1];
    const optionElementId1 = optionElement1.getAttribute("id");
    State=optionElementId1;
    
  };
  const handleOnChange = (e) => {
    //alert(e.target.value);
    const index = e.target.selectedIndex;
    const optionElement = e.target.childNodes[index];
    const optionElementId = optionElement.getAttribute("id");
    Country=optionElementId;
// alert(optionElementId);
    console.log(optionElementId);
    let url = "https://eqtg1ymmj8.execute-api.us-east-1.amazonaws.com/statesel";
    let dt='{"task":"stateselect","values":{"refCountryName":'+optionElementId+'}}';
    axios
      .post(url,dt )  
      .then((response) => {
        console.log(JSON.stringify(response.data));
        // alert(response)
        setStateList(response.data.values);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div class="container" className="App">
      <Heading />
      <form>
        <div class="form-group">
          <label for="countryselect">Country/Region</label>
          <select class="form-control" id="sel1" onChange={handleOnChange}>
            {countrylist.map((item) => {
              return <option id={item.id}>{item.txtCountryName}</option>;
            })}
          </select>
        </div>
        <br></br>
        <div class="form-group">
          <label for="inputUsername">Username</label>
          <input
            onChange={(e) => setUsername(e.target.value)}
            value={Username}
            type="text"
            class="form-control"
            id="inputUsername"
            placeholder="Username"
          />
        </div>
        <Row>
          <div class="form-group col-md-6">
            <label as={Col}>FirstName</label>
            <input
              onChange={(e) => setFirstName(e.target.value)}
              value={FirstName}
              type="text"
              class="form-control"
              id="inputFirstName"
              placeholder="Firstname"
            ></input>
          </div>
          <br></br>
          <div class="form-group col-md-6">
            <label as={Col}>Lastname</label>
            <input
              onChange={(e) => setLastname(e.target.value)}
              value={Lastname}
              type="text"
              class="form-control"
              id="inputLastname"
              placeholder="Lastname"
            ></input>
          </div>
        </Row>
        <br></br>
        <div class="form-group">
          <label for="inputPassword">Password</label>
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={Address}
            type="text"
            class="form-control"
            id="inputPassword"
            placeholder="********"
          />
        </div>
        <div class="form-group">
          <label for="inputAddress">Address</label>
          <input
            onChange={(e) => setAddress(e.target.value)}
            value={Address}
            type="text"
            class="form-control"
            id="inputAddress"
            placeholder="1234 Main St"
          />
        </div>
        <br></br>
        <div class="form-group">
          <label for="inputAddress">Street</label>
          <input
            onChange={(e) => setStreet(e.target.value)}
            value={Street}
            type="text"
            class="form-control"
            id="inputAddress2"
            placeholder="Street"
          />
        </div>
        <br></br>
        <div class="form-row">
          <Row>
            <div class="form-group col-md-4">
              <label as={Col} for="inputCity">
                City
              </label>
              <input
                onChange={(e) => setCity(e.target.value)}
                value={City}
                type="text"
                class="form-control"
                id="inputCity"
              ></input>
            </div>
            <div class="form-group col-md-4">
              <label as={Col} for="inputState">
                State
              </label>
              <select class="form-control" id="sel1" onChange={handleOnChange1}>
                {statelist.map((item) => {
                  return <option>{item.txtStateName}</option>;
                })}
              </select>
            </div>
            <div class="form-group col-md-4">
              <label as={Col} for="inputZip">
                Code
              </label>
              Pin
              <input
                onChange={(e) => setPin(e.target.value)}
                value={Pin}
                type="text"
                class="form-control"
                id="inputZip"
              ></input>
            </div>
          </Row>
        </div>
        <br></br>
        <Row>
          <div class="form-group col-md-6">
            <label as={Col}>Phone</label>
            <input
              onChange={(e) => setPhone(e.target.value)}
              value={Phone}
              type="text"
              class="form-control"
              id="inputPhone"
              placeholder="Phone"
            ></input>
          </div>
          <br></br>
          <div class="form-group col-md-6">
            <label as={Col}>Business or Personal website</label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={Email}
              type="text"
              class="form-control"
              id="inputEmail"
              placeholder="Email"
            ></input>
          </div>
        </Row>
        <br></br>
        <div class="form-group">
          <div class="form-check">
            <input class="form-check-input" type="checkbox" id="gridCheck" />
            <label class="form-check-label" for="gridCheck">
              This store is a registered business
            </label>
          </div>
        </div>
        <br></br>
        <br></br>
        <br></br> 
          <Button
            style={{ float: "right" }}
            type="submit"
            class="btn btn-success"
            onClick={handleSignupClick}
          >
            Enter my store
          </Button> 
        <Button type="submit" class="btn btn-light" onClick={handleClick}>
          Back
        </Button>
      </form>
    </div>
  );
}
export default App;

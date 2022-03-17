import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import App from "./App";
import Login from  "./Login";
import { BrowserRouter } from "react-router-dom";
import App1 from "./Dashboard";

const Navigation = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          
          <App />
        </Route>
        <Route path="/Login">
          
          <Login />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default Navigation;

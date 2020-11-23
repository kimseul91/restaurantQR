import React from "react";
import Staff from "./staff/home.js";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./staff/style/custom.css";
import CustomerHome from "./customer/CustomerHome.js";
import Menu from "./customer/Menu.js";
import StaffEdit from "./staff/StaffEdit.js";
import Login from "./staff/Authentication/Login";
import SignUp from "./staff/Authentication/SignUp";

import "./App.css";

function App(props) {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/">
            <Login />
          </Route>
          <Route exact path="/signup">
            <SignUp />
          </Route>
          <Route exact path="/staff/edit" component={StaffEdit} />
          <Route
            exact
            path="/staff"
            render={(...props) => <Staff {...props} />}
          />
          <Route exact path="/customer/:restaurantName/:tableID">
            <CustomerHome match={props.match} />
          </Route>
          <Route
            exact
            path="/customer/:restaurantName/:tableID/menu"
            render={({ match, location }) => (
              <Menu match={match} location={location} />
            )}
          ></Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;

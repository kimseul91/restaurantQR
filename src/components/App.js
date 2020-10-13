import React from "react";
import Home from "./customer/CustomerHome.js";
import Menu from "./customer/Menu.js";
import Header from "./customer/Header.js";
import Staff from "./staff/home.js";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { MenuItem } from "@material-ui/core";

function App() {
  const menu = [
    { name: "Tacos", description: "Ground beef tacos" },
    { name: "Enchiladas", description: "Cheese enchiladas" },
    { name: "Enchiladas", description: "Cheese enchiladas" },
    { name: "Enchiladas", description: "Cheese enchiladas" },
    { name: "Enchiladas", description: "Cheese enchiladas" },
    { name: "Enchiladas", description: "Cheese enchiladas" },
    { name: "Enchiladas", description: "Cheese enchiladas" },
    { name: "Enchiladas", description: "Cheese enchiladas" },
    { name: "Enchiladas", description: "Cheese enchiladas" },
  ];

  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/"> HOME</Link>
            </li>
            <li>
              <Link to="/customer">Customer</Link>
            </li>
            <li>
              <Link to="/staff">Staff</Link>
            </li>
          </ul>
        </nav>
        <Switch>
          <Route exact path="/">
            <></>
          </Route>
          <Route path="/customer">
            <Home name="Test" />
          </Route>
          <Route path="/staff">
            <Staff />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;

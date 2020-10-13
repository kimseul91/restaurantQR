import React from "react";
import Home from "./customer/Home.js";
import Staff from "./staff/home.js";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li><Link to="/"> HOME</Link></li>
            <li><Link to="/customer">Customer</Link></li>
            <li><Link to="/staff">Staff</Link></li>
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

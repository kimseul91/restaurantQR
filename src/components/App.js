import React, { useState } from "react";
import Staff from "./staff/home.js";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import CustomerHome from "./customer/CustomerHome.js";
import Menu from "./customer/Menu.js";
import StaffEdit from "./staff/StaffEdit.js";
import Login from "./staff/Authentication/Login";
import SignUp from "./staff/Authentication/SignUp";
import EditMenu from "./staff/EditMenu";

import "./App.css";

// Make an account for each restaurant
// on mount of App make a post request to

function App(props) {
  const [name, setName] = useState("");
  const [tableID, setID] = useState("");
  const [language, setLanguage] = useState("");

  const languageDictionary = {
    English: "en",
    Spanish: "es",
    French: "fr",
  };

  const updateApp = (rName, id) => {
    setName(rName);
    setID(id);
  };
  const updateLanguage = (language) => {
    setLanguage(languageDictionary[language]);
  };

  // const restaurantName = "Tucker's Test Restaurant";
  // Need to query database to get the menu
  // and the restaurant name

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
          <Route
            exact
            path="/staff/edit/menu"
            render={(...props) => <EditMenu {...props} />}
          />
          <Route exact path="/customer/:restaurantName/:tableID">
            <CustomerHome
              updateApp={updateApp}
              updateLanguage={updateLanguage}
              match={props.match}
            />
          </Route>
          <Route
            exact
            path="/customer/:restaurantName/:tableID/menu"
            render={({ match, location }) => (
              <Menu
                name={name}
                tableID={tableID}
                language={language}
                match={match}
                location={location}
              />
            )}
          ></Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;

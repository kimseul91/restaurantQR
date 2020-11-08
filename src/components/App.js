import React, { useState } from "react";
import Staff from "./staff/home.js";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import CustomerHome from "./customer/CustomerHome.js";
import Menu from "./customer/Menu.js";
import StaffEdit from "./staff/StaffEdit.js";
// import Header from "./customer/Header.js";
// import MenuItem from "./customer/MenuItem.js";
import "./App.css";

// Make an account for each restaurant
// on mount of App make a post request to

function App() {
  const [name, setName] = useState("");
  const [tableID, setID] = useState("");
  const [language, setLanguage] = useState("");

  const languageDictionary = {
    English: "en",
    Spanish: "es",
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
            <></>
          </Route>
          <Route exact path="/staff/edit" component={StaffEdit} />
          <Route exact path="/staff" component={Staff} />
          <Route exact path="/customer/:restaurantName/:tableID">
            <CustomerHome
              updateApp={updateApp}
              updateLanguage={updateLanguage}
            />
          </Route>
          <Route exact path="/customer/menu">
            {tableID !== "" && (
              <Menu name={name} tableID={tableID} language={language} />
            )}
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;

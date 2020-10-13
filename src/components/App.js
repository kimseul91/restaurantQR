import React from "react";
import Home from "./customer/CustomerHome.js";
import Menu from "./customer/Menu.js";
import Header from "./customer/Header.js";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useParams,
} from "react-router-dom";

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
    // <Router>
    //   <Switch>
    //     <Route exact path="/menu/:item">
    //       <MenuItem item={} />
    //       <Menu name={"Tucker's Test Restaurant"} menuItems={menu} />
    //     </Route>
    //     {/* <Home name={"Tucker's Test Restaurant"} /> */}
    //     {/* <Header name={"Tucker's Test Restaurant"} /> */}
    //   </Switch>
    // </Router>

    <div className="App">
      {/* <Menu name={"Tucker's Test Restaurant"} menuItems={menu} /> */}
      <Home name={"Tucker's Test Restaurant"} />
    </div>
  );
}

export default App;

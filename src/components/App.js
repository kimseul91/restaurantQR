import React from "react";
import Staff from "./staff/home.js";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import CustomerHome from "./customer/CustomerHome.js";
import Menu from "./customer/Menu.js";
import Header from "./customer/Header.js";
import MenuItem from "./customer/MenuItem.js";
import "./App.css";

// Make an account for each restaurant
// on mount of App make a post request to

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

  const restaurantName = "Tucker's Test Restaurant";
  // Need to query database to get the menu
  // and the restaurant name

  return (
    // <Router>
    //   {/* <div> */}
    //   {/* <nav>
    //       <ul>
    //         <li>
    //           <Link to="/"> HOME</Link>
    //         </li>
    //         <li>
    //           <Link to="/customer">Customer</Link>
    //         </li>
    //         <li>
    //           <Link to="/staff">Staff</Link>
    //         </li>
    //         <li>
    //           <Link to="/customer/menu">Menu</Link>
    //         </li>
    //       </ul>
    //     </nav> */}
    //   <Switch>
    //     <Route exact path="/">
    //       <></>
    //     </Route>
    //     <Route exact path="/customer">
    //       <CustomerHome name="Test" />
    //     </Route>
    //     <Route path="/staff">
    //       <Staff />
    //     </Route>
    //     <Route path="/customer/menu">
    //       <Menu name={restaurantName} menuItems={menu} />
    //     </Route>
    //   </Switch>
    //   {/* </div> */}
    // </Router>
    <Menu name={restaurantName} menuItems={menu} />
  );
}

export default App;

import React from "react";
import "./customer.css";
import Header from "./Header.js";
import { Link } from "react-router-dom";
function Menu(props) {
  // props.name == the restaurant name;
  // props.menuItems == array of menu items

  // transistions to the menu item page
  const getMenuItem = () => {};

  return (
    <div>
      <Header name={"Tucker's Test Restaurant"} />
      <div id="menuCardsDiv">
        {props.menuItems.map((item) => (
          // <Link>
          <div className="itemCard" onClick={getMenuItem(item)}>
            <span className="itemText">{`${item.name}: ${item.description}`}</span>
          </div>
          // </Link>
        ))}
      </div>
    </div>
  );
}

export default Menu;

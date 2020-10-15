import React, { useState, useEffect } from "react";
import "./customer.css";
import Header from "./Header.js";
import MenuItem from "./MenuItem.js";
import axios from "axios";
function Menu(props) {
  // props.name == the restaurant name;
  // props.menuItems == array of menu items
  const [fullMenu, setMenu] = useState(null);
  const [itemView, setItemView] = useState(false);
  const [currentItem, setItem] = useState(null);

  useEffect(async () => {
    const menuRequest = await axios.get(
      "http://localhost:5001/restaurantqr-73126/us-central1/api/test_restaurant_3/menu"
    );
    const menuData = menuRequest.data.menu;
    setMenu(menuData);
    console.log(menuData);
  }, []);

  /**
   * transistions to the menu item page
   * sets the item for itemView
   * @param {menu item object} item
   */
  const getMenuItem = (item) => {
    console.log(item);
    setItem(item);
    setItemView(true);
  };

  // sent as a prop to a menu item to change back to menu view
  const changeToMenuView = () => {
    setItemView(false);
  };

  // changes to the item view if you click on an item
  if (itemView) {
    return (
      <MenuItem
        name={props.name}
        item={currentItem}
        goBackToMenu={changeToMenuView}
      />
    );
  }

  return (
    <div>
      <Header name={"Tucker's Test Restaurant"} />
      <div id="menuCardsDiv">
        {props.menuItems.map((item) => (
          <div className="itemCard" onClick={() => getMenuItem(item)}>
            <span className="itemText">{`${item.name}: ${item.description}`}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Menu;

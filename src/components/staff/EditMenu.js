import React, { useEffect, useState } from "react";
import Header from "../customer/Header";
import MenuDiv from "./MenuDiv";
import EditMenuButtons from "./EditMenuButtons";
import axios from "axios";

import "./EditMenu.css";
function EditMenu(props) {
  const [menu, setMenu] = useState(null);
  console.log("helloo");
  useEffect(() => {
    (async function () {
      const menuRequest = await axios.get(
        `https://us-central1-restaurantqr-73126.cloudfunctions.net/api/${encodeURI(
          props.name ? props.name : "Sushi-o"
        )}/menu`
      );
      const menuData = menuRequest.data.menu;
      setMenu(menuData);
      console.log(menuData);
    })();
  }, []);
  return (
    <div className="editMenuDiv">
      <Header name={props.name ? props.name : "Sushi-o"} />
      <div id="spacer"></div>
      <div id="outerCenter">
        <EditMenuButtons />
        <MenuDiv menu={menu} />
      </div>
    </div>
  );
}

export default EditMenu;

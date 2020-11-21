import React, { useEffect, useState } from "react";
import Header from "../customer/Header";
import MenuDiv from "./MenuDiv";
import EditMenuButtons from "./EditMenuButtons";
import axios from "axios";

import "./EditMenu.css";
import EditText from "./EditText";
import EditMenuLeftPanel from "./EditMenuLeftPanel";

function EditMenu(props) {
  const [menu, setMenu] = useState(null);
  const [counter, setCounter] = useState(0);

  const update = () => {
    setCounter(counter + 1);
  };

  useEffect(() => {
    (async function () {
      const menuRequest = await axios.get(
        `https://us-central1-restaurantqr-73126.cloudfunctions.net/api/${encodeURI(
          props.name ? props.name : "Tucker"
        )}/menu`
      );
      const menuData = menuRequest.data.menu;
      setMenu(menuData);
      console.log(menuData);
    })();
  }, [counter]);
  return (
    <div className="editMenuDiv">
      <Header name={props.name ? props.name : "Sushi-o"} />
      <div id="spacer"></div>
      <div id="outerCenter">
        <EditMenuLeftPanel update={update} />
        <MenuDiv menu={menu} />
      </div>
    </div>
  );
}

export default EditMenu;

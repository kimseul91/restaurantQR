import React, { useEffect, useState } from "react";
import MenuDiv from "./MenuDiv";
import axios from "axios";
import "./EditMenu.css";
import EditMenuLeftPanel from "./EditMenuLeftPanel";

function EditMenu(props) {
  // main component for editing menus
  const [menu, setMenu] = useState(null);
  const [counter, setCounter] = useState(0);

  const update = () => {
    // used to force a component update
    setCounter(counter + 1);
  };

  useEffect(() => {
    (async function () {
      // sets all of the current menu data
      const menuRequest = await axios.get(
        `https://us-central1-restaurantqr-73126.cloudfunctions.net/api/${encodeURI(
          props.name
        )}/menu`
      );
      const menuData = menuRequest.data.menu;
      setMenu(menuData);
    })();
  }, [counter]);
  return (
    <div className="editMenuDiv">
      <div id="outerCenter">
        <EditMenuLeftPanel update={update} name={props.name} />
        <MenuDiv menu={menu} name={props.name} />
      </div>
    </div>
  );
}

export default EditMenu;

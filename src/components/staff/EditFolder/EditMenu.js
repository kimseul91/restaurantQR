import React, { useEffect, useState } from "react";
import Header from "../../customer/Header";
import MenuDiv from "./MenuDiv";
import EditMenuButtons from "./EditMenuButtons";
import axios from "axios";

import "./EditMenu.css";
import EditText from "./EditText";
import EditMenuLeftPanel from "./EditMenuLeftPanel";
import Firebase from "../../../Firebase";

function EditMenu() {
  const [menu, setMenu] = useState(null);
  const [counter, setCounter] = useState(0);
  const [currentName, setName] = useState(null);

  const update = () => {
    setCounter(counter + 1);
  };

  useEffect(() => {
    (async function () {
      const currentInfo = (
        await axios.post(
          "https://us-central1-restaurantqr-73126.cloudfunctions.net/api/restaurant/getName",
          {
            user: Firebase.auth.currentUser,
          }
        )
      ).data;

      setName(currentInfo.name);

      const menuRequest = await axios.get(
        `https://us-central1-restaurantqr-73126.cloudfunctions.net/api/${encodeURI(
          currentInfo.name
        )}/menu`
      );
      const menuData = menuRequest.data.menu;
      setMenu(menuData);
    })();
  }, [counter]);
  return (
    <div className="editMenuDiv">
      {/* <Header name={currentName} /> */}
      {/* <div id="spacer"></div> */}
      <div id="outerCenter">
        <EditMenuLeftPanel update={update} />
        <MenuDiv menu={menu} />
      </div>
    </div>
  );
}

export default EditMenu;

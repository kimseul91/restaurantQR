import React from "react";
import "./customer.css";
import { useParams } from "react-router-dom";

function MenuItem(props) {
  // props.item == the menu item obj to be displayed

  const { item } = useParams();

  // when componenet mounts make a call to an endpoint to retrieve the
  useEffect(async () => {}, []);

  const testItem = {
    name: "Tacos",
    price: "9.99",
    description: "These are tacos.",
  };

  return (
    <div>
      <div id="menuCardsDiv">
        <div className="itemCard">
          <span>{`$${testItem.price} ${testItem.name}: ${testItem.description}`}</span>
        </div>
      </div>
    </div>
  );
}

export default MenuItem;

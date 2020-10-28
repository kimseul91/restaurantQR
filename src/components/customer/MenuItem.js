import React from "react";
import "./customer.css";
import Button from "react-bootstrap/Button";
import Header from "./Header";
import axios from "axios";

function MenuItem(props) {
  // props.item == the menu item obj to be displayed

  // items will look like this
  const testItem = {
    name: "Tacos",
    price: "9.99",
    description:
      "A traditional topping of roma tomatoes, fresh basil and extra-virgin olive oil. Served with toasted ciabatta bread.",
  };

  const orderItem = async (itemName) => {
    // send api request to axios to add item to order
    await axios.put(
      "http://localhost:5001/restaurantqr-73126/us-central1/api/test_restaurant_3/customer/table/2/order",
      {
        request: itemName,
      }
    );
  };

  return (
    <div className="outerDiv">
      <Header name={props.name} />
      <div id="menuCardsDiv" className="flex-box">
        <span className="itemDescription" id="itemName">
          {props.item[0]}
        </span>
        <p className="itemDescription">{props.item[1].description}</p>
        {props.item[1].price && (
          <span className="itemDescription" id="itemPrice">
            Price: ${props.item[1].price}
          </span>
        )}
      </div>
      <div className="button-box">
        <Button
          className="buttonSize"
          variant="primary"
          onClick={props.goBackToMenu}
        >
          {" "}
          Go Back{" "}
        </Button>
        <Button
          className="buttonSize"
          variant="primary"
          onClick={() => orderItem(props.item[0])}
        >
          {" "}
          Order{" "}
        </Button>
      </div>
    </div>
  );
}

export default MenuItem;

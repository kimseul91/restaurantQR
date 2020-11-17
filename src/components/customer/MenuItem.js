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
    const translatedItemName = await axios.post(
      "http://localhost:5001/restaurantqr-73126/us-central1/api/translate/item",
      { item: itemName }
    ).data;

    // send api request to axios to add item to order
    await axios.put(
      //      `https://restaurantqr-73126.cloudfunctions.net/us-central1/api/${props.name}/menu`
      //      `http://localhost:5001/restaurantqr-73126/us-central1/api/${props.name}/customer/table/${props.tableID}/order`,
      `https://us-central1-restaurantqr-73126.cloudfunctions.net/api/${props.name}/customer/table/${props.tableID}/order`,
      {
        request: translatedItemName,
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
            Price: ${props.item[1].price.toFixed(2)}
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

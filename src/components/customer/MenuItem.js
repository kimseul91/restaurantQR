import React from "react";
import "./customer.css";
import Button from "react-bootstrap/Button";
import Header from "./Header";

function MenuItem(props) {
  // props.item == the menu item obj to be displayed

  // items will look like this
  const testItem = {
    name: "Tacos",
    price: "9.99",
    description:
      "A traditional topping of roma tomatoes, fresh basil and extra-virgin olive oil. Served with toasted ciabatta bread.",
  };

  const orderItem = (itemName) => {
    // send api request to axios to add item to order
  };

  return (
    <div className="outerDiv">
      <Header name={props.name} />
      <div id="menuCardsDiv" className="flex-box">
        <span className="itemDescription" id="itemName">
          {testItem.name}
        </span>
        <p className="itemDescription">{testItem.description}</p>
        <span className="itemDescription" id="itemPrice">
          Price: ${testItem.price}
        </span>
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
        <Button className="buttonSize" variant="primary" onClick={orderItem()}>
          {" "}
          Order{" "}
        </Button>
      </div>
    </div>
  );
}

export default MenuItem;

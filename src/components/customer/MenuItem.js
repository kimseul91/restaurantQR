import React, { useState } from "react";
import "./customer.css";
import Button from "react-bootstrap/Button";
import { Snackbar } from "@material-ui/core";
import Header from "./Header";
import axios from "axios";
import MuiAlert from "@material-ui/lab/Alert";

function MenuItem(props) {
  // props.item == the menu item obj to be displayed

  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const orderItem = async (itemName) => {
    // handleClick();
    // props.handleOrderSuccess();
    console.log(props.language);

    // doesnt need a translation
    if (props.language !== "en") {
      const translatedItemName = (
        await axios.post(
          "https://us-central1-restaurantqr-73126.cloudfunctions.net/api/translate/item",
          { item: itemName, language: props.language }
        )
      ).data;

      console.log(translatedItemName);
      console.log(Date.now());
      // send api request to axios to add item to order
      await axios.put(
        //      `https://restaurantqr-73126.cloudfunctions.net/us-central1/api/${props.name}/menu`
        `http://localhost:5001/restaurantqr-73126/us-central1/api/${props.name}/customer/table/${props.tableID}/order`,
        // `https://us-central1-restaurantqr-73126.cloudfunctions.net/api/${props.name}/customer/table/${props.tableID}/order`,
        {
          request: translatedItemName,
          time: Date.now(),
        }
      );
    } else {
      await axios.put(
        `https://us-central1-restaurantqr-73126.cloudfunctions.net/api/${props.name}/customer/table/${props.tableID}/order`,
        {
          request: itemName,
          time: Date.now(),
        }
      );
    }
  };

  return (
    <div className="outerDiv">
      <Header name={props.name} />
      <div id="menuSingleItemDiv" className="flex-box">
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
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={open}
        autoHideDuration={5000}
        onClose={handleClose}
        key={"top" + "center"}
      >
        <MuiAlert elevation={6} variant="filled" severity="error">
          Something went wrong, please try again!
        </MuiAlert>
      </Snackbar>
    </div>
  );
}

export default MenuItem;

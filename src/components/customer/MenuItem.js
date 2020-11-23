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

  const handleFail = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const orderItem = async (itemName) => {
    // handleClick();
    // props.handleOrderSuccess();

    // doesnt need a translation
    if (props.language !== "en") {
      try {
        const translatedItemName = (
          await axios.post(
            "https://us-central1-restaurantqr-73126.cloudfunctions.net/api/translate/item",
            { item: itemName, language: props.language }
          )
        ).data;

        // send api request to axios to add item to order
        await axios.put(
          //      `https://restaurantqr-73126.cloudfunctions.net/us-central1/api/${props.name}/menu`
          // `http://localhost:5001/restaurantqr-73126/us-central1/api/${props.name}/customer/table/${props.tableID}/order`,
          `https://us-central1-restaurantqr-73126.cloudfunctions.net/api/${props.name}/customer/table/${props.tableID}/order`,
          {
            request: translatedItemName,
            time: Date.now(),
          }
        );
        props.handleOrderSuccess();
      } catch (error) {
        handleFail();
      }
    } else {
      try {
        await axios.put(
          `https://us-central1-restaurantqr-73126.cloudfunctions.net/api/${props.name}/customer/table/${props.tableID}/order`,
          // `http://localhost:5001/restaurantqr-73126/us-central1/api/${props.name}/customer/table/${props.tableID}/order`,
          {
            request: itemName,
            time: Date.now(),
          }
        );
        props.handleOrderSuccess();
      } catch (error) {
        handleFail();
      }
    }
  };

  const randomPicArray = [
    "https://thestayathomechef.com/wp-content/uploads/2017/08/Most-Amazing-Lasagna-2-e1574792735811.jpg",
    "https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F9%2F2013%2F12%2F06%2Fmolten-chocolate-cake-FT-RECIPE0220.jpg",
    "https://www.thecheesecakefactory.com/assets/images/Menu-Import/960x720-CCF_BarbequeRanchChickenSalad.jpg",
    "https://www.thecheesecakefactory.com/assets/images/Menu-Import/960x720-CCF_SLSteakMedallions.jpg",
    "https://content.money.com/wp-content/uploads/2018/03/18023-cheesecake-factory-main-dishes-steak-diane.jpg?quality=60",
    "https://www.godairyfree.org/wp-content/uploads/2010/07/resto-cheesecake-factory-feature4.jpg",
    "https://cloudfront.bjsrestaurants.com/img_5a72ebdb0a2805.30198713_img_5a5c3fb17acf12.79749172_Untitled-2.jpg",
    "https://i2.wp.com/www.eatthis.com/wp-content/uploads/2020/07/assorted-sushi.jpg?resize=640%2C360&ssl=1",
    "https://www.qsrmagazine.com/sites/default/files/styles/story_page/public/phut_0.jpg?itok=h30EAnkk",
    "https://images.chinahighlights.com/allpicture/2019/11/a4ad4a7fe0cb401cb0be6383_894x598.jpg",
  ];
  const randomIndex = Math.ceil(randomPicArray.length * Math.random());

  return (
    <div className="outerDiv">
      <Header name={props.name} />
      <div id="menuSingleItemDiv" className="flex-box">
        <span className="itemDescription itemHeaderName" id="itemName">
          {props.item[0]}
        </span>
        <img src={randomPicArray[randomIndex]} className="food" />
        <p className="itemDescription" id="actualDescription">
          {props.item[1].description === "" ? null : props.item[1].description}
        </p>
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

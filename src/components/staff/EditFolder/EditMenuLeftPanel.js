import React, { useEffect, useState } from "react";
import Header from "../../customer/Header";
import MenuDiv from "./MenuDiv";
import EditMenuButtons from "./EditMenuButtons";
import axios from "axios";
import Firebase from "../../../Firebase";

import "./EditMenu.css";
import EditText from "./EditText";

function EditMenuLeftPanel(props) {
  const [section, setSection] = useState("");
  const [item, setItem] = useState("");
  const [price, setPrice] = useState(5.99);
  const [description, setDescription] = useState("");

  const addNewSection = async () => {
    // const currentInfo = (
    //   await axios.post(
    //     "https://us-central1-restaurantqr-73126.cloudfunctions.net/api/restaurant/getName",
    //     {
    //       user: Firebase.auth.currentUser,
    //     }
    //   )
    // ).data;

    const name = props.name;

    await axios.post(
      "https://us-central1-restaurantqr-73126.cloudfunctions.net/api/restaurant/addNew/section",
      // "http://localhost:5001/restaurantqr-73126/us-central1/api/restaurant/addNew/section",

      {
        user: Firebase.auth.currentUser,
        sectionName: section,
        name: name,
      }
    );
    props.update();
  };

  const addNewItem = async () => {
    // const currentInfo = (
    //   await axios.post(
    //     "https://us-central1-restaurantqr-73126.cloudfunctions.net/api/restaurant/getName",

    //     {
    //       user: Firebase.auth.currentUser,
    //     }
    //   )
    // ).data;

    // const name = currentInfo.name;
    const name = props.name;

    await axios.post(
      "https://us-central1-restaurantqr-73126.cloudfunctions.net/api/restaurant/addNew/item",
      // "http://localhost:5001/restaurantqr-73126/us-central1/api/restaurant/addNew/item",
      {
        user: Firebase.auth.currentUser,
        sectionName: section,
        itemName: item,
        price: price,
        description: description,
        name: name,
      }
    );
    props.update();
  };

  const deleteItem = async () => {
    // const currentInfo = (
    //   await axios.post(
    //     "https://us-central1-restaurantqr-73126.cloudfunctions.net/api/restaurant/getName",
    //     {
    //       user: Firebase.auth.currentUser,
    //     }
    //   )
    // ).data;

    // const name = currentInfo.name;

    const name = props.name;

    await axios.post(
      "https://us-central1-restaurantqr-73126.cloudfunctions.net/api/restaurant/delete/item",
      // "http://localhost:5001/restaurantqr-73126/us-central1/api/restaurant/delete/item",

      {
        user: Firebase.auth.currentUser,
        sectionName: section,
        itemName: item,
        name: name,
      }
    );
    props.update();
  };

  const deleteSection = async () => {
    // const currentInfo = (
    //   await axios.post(
    //     "https://us-central1-restaurantqr-73126.cloudfunctions.net/api/restaurant/getName",
    //     {
    //       user: Firebase.auth.currentUser,
    //     }
    //   )
    // ).data;

    // const name = currentInfo.name;

    const name = props.name;

    await axios.post(
      "https://us-central1-restaurantqr-73126.cloudfunctions.net/api/restaurant/delete/section",
      // "http://localhost:5001/restaurantqr-73126/us-central1/api/restaurant/delete/section",

      {
        user: Firebase.auth.currentUser,
        sectionName: section,
        name: name,
      }
    );
    props.update();
  };

  const getSectionText = (text) => {
    setSection(text);
  };

  const getItemText = (text) => {
    setItem(text);
  };
  const getPrice = (number) => {
    setPrice(number);
  };
  const getDescription = (text) => {
    setDescription(text);
  };

  return (
    <div className="leftPanel">
      <EditMenuButtons
        addNewSection={addNewSection}
        addNewItem={addNewItem}
        deleteItem={deleteItem}
        deleteSection={deleteSection}
      />
      <EditText
        getSectionText={getSectionText}
        getItemText={getItemText}
        getPrice={getPrice}
        getDescription={getDescription}
      />
    </div>
  );
}

export default EditMenuLeftPanel;

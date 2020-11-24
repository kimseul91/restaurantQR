import React, { useState } from "react";
import EditMenuButtons from "./EditMenuButtons";
import axios from "axios";
import Firebase from "../../../Firebase";

import "./EditMenu.css";
import EditText from "./EditText";

function EditMenuLeftPanel(props) {
  // parent component that manages the left panel of EditMenu
  // controls the api requests
  const [section, setSection] = useState("");
  const [item, setItem] = useState("");
  const [price, setPrice] = useState(5.99);
  const [description, setDescription] = useState("");

  const addNewSection = async () => {
    // sends an api request to add a new section
    const name = props.name;

    await axios.post(
      "https://us-central1-restaurantqr-73126.cloudfunctions.net/api/restaurant/addNew/section",
      {
        user: Firebase.auth.currentUser,
        sectionName: section,
        name: name,
      }
    );
    props.update();
  };

  const addNewItem = async () => {
    // sends an api request to add a new item or update a current item's price or description
    const name = props.name;

    await axios.post(
      "https://us-central1-restaurantqr-73126.cloudfunctions.net/api/restaurant/addNew/item",
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
    // sends a request to delete an item
    const name = props.name;

    await axios.post(
      "https://us-central1-restaurantqr-73126.cloudfunctions.net/api/restaurant/delete/item",

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
    // sends a request to delete a menu section
    const name = props.name;

    await axios.post(
      "https://us-central1-restaurantqr-73126.cloudfunctions.net/api/restaurant/delete/section",

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

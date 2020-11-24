import React, { useState } from "react";
import { DropdownButton, Container } from "react-bootstrap";
import "./customer.css";
import DropdownItem from "react-bootstrap/esm/DropdownItem";
import FastfoodIcon from "@material-ui/icons/Fastfood";
import { useParams, Redirect } from "react-router-dom";

// landing page for customers at a specific restaurant
function CustomerHome(props) {
  // language dictionary that stores all the languages that we support translation for
  const languageDictionary = {
    English: "en",
    Spanish: "es",
    French: "fr",
    Korean: "ko",
    Portuguese: "pt",
    German: "de",
  };

  const languauges = Object.keys(languageDictionary);

  const [redirectLocation, setRedirect] = useState(null);

  // extracts these variables from the page routing
  const { restaurantName, tableID } = useParams();

  const handleClick = (language) => {
    // Route to menu page with given langauge
    setRedirect(
      <Redirect
        to={`/customer/${restaurantName}/${tableID}/menu?lang=${languageDictionary[language]}`}
      />
    );
  };

  // routes to the menu page after you select a language
  if (redirectLocation) {
    return redirectLocation;
  }

  return (
    <div className="Home">
      <div className="headerDiv wide">
        <span id="restaurantName">{`Welcome to ${decodeURI(
          restaurantName
        )}`}</span>
      </div>
      <Container className="flex-box">
        <div id="homeImgDiv">
          <FastfoodIcon className="homeIcon" />
          <div className="headerDiv">
            <span id="qrTitle">restaurantQR</span>
          </div>
        </div>
        <div id="languageDropdownDiv">
          <DropdownButton
            className="languageButton"
            title="Select language"
            size="lg"
          >
            <div className="dropdownItemDiv">
              {languauges.map((language) => (
                // onClick function to route you to the menu
                // with the language you clicked on enabled
                <DropdownItem
                  className="languageItem"
                  href=""
                  key={language}
                  onClick={() => {
                    handleClick(language);
                  }}
                >
                  {language}
                </DropdownItem>
              ))}
            </div>
          </DropdownButton>
        </div>
      </Container>
    </div>
  );
}

export default CustomerHome;

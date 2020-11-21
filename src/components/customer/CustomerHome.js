import React, { useEffect, useState } from "react";
import { DropdownButton, Container } from "react-bootstrap";
import "./customer.css";
import DropdownItem from "react-bootstrap/esm/DropdownItem";
import FastfoodIcon from "@material-ui/icons/Fastfood";
import { useParams, Link, Redirect } from "react-router-dom";
function CustomerHome(props) {
  // props.name == the restaurant name
  // const [name, setName] = useState(null);
  // language array that stores all the languages that we support translation for

  const languageDictionary = {
    English: "en",
    Spanish: "es",
    French: "fr",
    Korean: "ko",
    Portuguese: "pt",
    German: "de",
    Chinese: "zh",
  };

  const languauges = Object.keys(languageDictionary);

  const [redirectLocation, setRedirect] = useState(null);

  // extracts these variables from the page routing
  const { restaurantName, tableID } = useParams();

  // console.log(restaurantName, tableID);

  // sends the name and table id back to app so that the menu has access
  useEffect(() => {
    props.updateApp(restaurantName, tableID);
  });

  // spanish language code is es

  const handleClick = (language) => {
    // Route to menu page with given langauge
    props.updateLanguage(language);
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

  // we can use route parameters to get the restaurant name and table number

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
            // variant="primary"
            size="lg"
          >
            <div className="dropdownItemDiv">
              {languauges.map((language) => (
                // Add onClick function to route you to the menu
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

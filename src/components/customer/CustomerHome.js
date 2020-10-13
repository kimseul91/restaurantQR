import React from "react";
import { DropdownButton, Container } from "react-bootstrap";
import "./customer.css";
import DropdownItem from "react-bootstrap/esm/DropdownItem";
import FastfoodIcon from "@material-ui/icons/Fastfood";
function Home(props) {
  // props.name == the restaurant name

  // language array that stores all the languages that we support translation for
  const languauges = [
    "English",
    "Spanish",
    "French",
    "test",
    "test1",
    "testt2",
    "test3",
  ];

  const languageSetter = async (language) => {
    // Route to menu page with given langauge
  };
  return (
    <div className="Home">
      <div className="headerDiv">
        <span id="qrTitle">restaurantQR</span>
      </div>
      <div className="headerDiv">
        <span id="restaurantName">{props.name}</span>
      </div>
      <Container className="flex-box">
        <div id="homeImgDiv">
          <FastfoodIcon className="homeIcon" />
        </div>
        <div id="languageDropdownDiv">
          <DropdownButton
            className="languageButton"
            title="Select language"
            variant="primary"
            size="lg"
          >
            {languauges.map((language) => (
              // Add onClick function to route you to the menu
              // with the language you clicked on enabled
              <DropdownItem
                className="languageItem"
                href=""
                onClick={languageSetter(language)}
              >
                {language}
              </DropdownItem>
            ))}
          </DropdownButton>
        </div>
      </Container>
    </div>
  );
}

export default Home;

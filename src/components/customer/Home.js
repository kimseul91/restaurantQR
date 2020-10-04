import React from "react";
import { DropdownButton } from "react-bootstrap";
import "./customer.css";
import DropdownItem from "react-bootstrap/esm/DropdownItem";
function Home(props) {
  // props.name == the restaurant name

  // language array that stores all the languages that we support translation for
  const languauges = ["English", "Spanish", "French"];
  return (
    <div className="Home">
      <div className="headerDiv">
        <span id="restaurantName">{props.name}</span>
      </div>
      <div id="homeImgDiv">
        <img src="" alt="imgForHome" />
      </div>
      <div id="languageDropdownDiv">
        <DropdownButton
          className="languageButton"
          title="Select language"
          variant="primary"
        >
          {languauges.map((language) => (
            <DropdownItem className="languageItem" href="">
              {language}
            </DropdownItem>
          ))}
        </DropdownButton>
      </div>
    </div>
  );
}

export default Home;

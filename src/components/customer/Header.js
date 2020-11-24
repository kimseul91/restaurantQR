import React from "react";
import "./customer.css";
import FastfoodIcon from "@material-ui/icons/Fastfood";
function Header(props) {
  // main header for the customer pages
  return (
    <div className="headerDiv mainHeader wide" id="newHeader">
      <FastfoodIcon
        fontSize="large"
        style={{ marginRight: "10px", color: "white" }}
      />
      <span id="restaurantName">{props.name}</span>
    </div>
  );
}

export default Header;

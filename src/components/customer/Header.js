import React from "react";
import "./customer.css";
import FastfoodIcon from "@material-ui/icons/Fastfood";
function Header(props) {
  return (
    <div className="headerDiv mainHeader wide">
      <FastfoodIcon
        fontSize="large"
        style={{ marginRight: "10px", color: "white" }}
      />
      <span id="restaurantName">{props.name}</span>
    </div>
  );
}

export default Header;

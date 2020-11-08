import React from "react";
import FastfoodIcon from "@material-ui/icons/Fastfood";
function LoginHeader(props) {
  return (
    <div id="loginHeader">
      <span id="restaurantName">
        {" "}
        <FastfoodIcon
          fontSize="large"
          style={{ marginRight: "10px", color: "white" }}
        />{" "}
        Welcome to restaurantQR
      </span>
    </div>
  );
}

export default LoginHeader;

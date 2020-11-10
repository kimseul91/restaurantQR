import React from "react";
import FastfoodIcon from "@material-ui/icons/Fastfood";
import LoginHeader from "./LoginHeader";
import LoginBox from "./LoginBox";
import "./Auth.css";

function Login(props) {
  return (
    <div className="overallLogin">
      <LoginHeader />
      <LoginBox />
    </div>
  );
}

export default Login;

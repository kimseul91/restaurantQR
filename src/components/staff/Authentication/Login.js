import React from "react";
import LoginHeader from "./LoginHeader";
import LoginBox from "./LoginBox";
import "./Auth.css";

function Login(props) {
  // main parent component for the login
  return (
    <div className="overallLogin">
      <LoginHeader />
      <LoginBox />
    </div>
  );
}

export default Login;

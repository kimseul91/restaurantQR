import React from "react";
import LoginHeader from "./LoginHeader";
import LoginBox from "./LoginBox";
import DemoCustomer from "./DemoCustomer";
import "./Auth.css";

function Login(props) {
  // main parent component for the login
  return (
    <div className="overallLogin">
      <LoginHeader />
      <LoginBox />
      <DemoCustomer />
    </div>
  );
}

export default Login;

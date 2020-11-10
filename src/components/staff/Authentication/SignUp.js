import React from "react";
import FastfoodIcon from "@material-ui/icons/Fastfood";
import LoginHeader from "./LoginHeader";
import LoginBox from "./LoginBox";
import "./Auth.css";
import SignUpBox from "./SignUpBox";

function SignUp(props) {
  return (
    <div className="overallLogin">
      <LoginHeader />
      <SignUpBox />
    </div>
  );
}

export default SignUp;

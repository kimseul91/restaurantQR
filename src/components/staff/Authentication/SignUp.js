import React from "react";
import LoginHeader from "./LoginHeader";
import "./Auth.css";
import SignUpBox from "./SignUpBox";

function SignUp(props) {
  // main signup component
  return (
    <div className="overallLogin">
      <LoginHeader />
      <SignUpBox />
    </div>
  );
}

export default SignUp;

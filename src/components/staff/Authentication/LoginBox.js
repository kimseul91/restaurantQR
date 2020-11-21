import React, { useState } from "react";
import "./Auth.css";
import { Container, InputGroup, Button, Form, Row, Col } from "react-bootstrap";
import { Link, Redirect } from "react-router-dom";
import Firebase from "../../../Firebase";
function LoginBox(props) {
  const [redirect, setRedirect] = useState(null);
  const handleSubmit = async (event) => {
    event.preventDefault();
    // extracts the email and password from the form
    const { preEmail, prePassword } = event.target.elements;
    const email = preEmail.value;
    const password = prePassword.value;
    let success = true;
    // send info to firebase for the login
    await Firebase.auth
      .signInWithEmailAndPassword(email, password)
      .catch((err) => {
        success = false;
        alert("Something went wrong please try again");
      });

    // redirect to staff if successful login
    if (success) {
      setRedirect(
        // inspiration from https://stackoverflow.com/questions/52064303/reactjs-pass-props-with-redirect-component
        <Redirect to={{ pathname: "/staff", state: { name: "yo" } }} />
      );
    }
  };
  return (
    <div className="outerLogin">
      <Form className="loginForm" onSubmit={(event) => handleSubmit(event)}>
        <div className="inputBoxDiv">
          <h3 className="loginTextHeader">Login</h3>
          <input
            className="inputText"
            name="preEmail"
            placeholder="Email"
            type="email"
          ></input>
          <input
            className="inputText"
            name="prePassword"
            type="password"
            placeholder="Password"
          ></input>
          <Button variant="primary" type="submit" className="loginBtn">
            Login
          </Button>
          <span id="linkSpan">
            Don't have an account? Restaurants sign up{" "}
            <Link to="/signup" className="coloredLink">
              here
            </Link>{" "}
          </span>
        </div>
      </Form>
      {redirect}
    </div>
  );
}

export default LoginBox;

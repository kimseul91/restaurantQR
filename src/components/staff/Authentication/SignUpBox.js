import React, { useState } from "react";
import "./Auth.css";
import { Container, InputGroup, Button, Form, Row, Col } from "react-bootstrap";
import { Link, Redirect } from "react-router-dom";
import Firebase from "../../../Firebase";
import axios from "axios";
function SignUpBox(props) {
  const [redirect, setRedirect] = useState(null);
  const handleSubmit = async (event) => {
    event.preventDefault();
    // extracts the email and password from the form
    const {
      preEmail,
      prePassword,
      preConfirm,
      preName,
      preAddress,
    } = event.target.elements;
    const email = preEmail.value;
    const password = prePassword.value;
    const confirm = preConfirm.value;
    const name = preName.value;
    const address = preAddress.value;

    // makes sure passwords match before creating account
    if (password !== confirm) {
      alert("Passwords do not match!");
      return;
    }
    let success = true;
    // send info to firebase for the login
    await Firebase.auth
      .createUserWithEmailAndPassword(email, password)
      .catch((err) => {
        success = false;
        alert("Something went wrong please try again");
      });

    // redirect to staff if successful login and create account in database
    if (success) {
      // send request to add record to db

      await Firebase.auth.signInWithEmailAndPassword(email, password);

      await axios
        .post(
          "http://localhost:5001/restaurantqr-73126/us-central1/api/restaurant/createAccount",
          { name: name, uid: Firebase.auth.currentUser.uid, address: address }
        )
        .catch((err) => console.log(err));
      // redirect
      setRedirect(<Redirect to="/staff" />);
    }
  };
  return (
    <div className="outerLogin">
      <Form className="loginForm" onSubmit={(event) => handleSubmit(event)}>
        <div className="inputBoxDiv">
          <h3 className="loginTextHeader">Sign Up</h3>
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
          <input
            className="inputText"
            name="preConfirm"
            type="password"
            placeholder="Confirm Password"
          ></input>
          <input
            className="inputText"
            name="preName"
            type="text"
            placeholder="Restaurant Name"
          ></input>
          <input
            className="inputText"
            name="preAddress"
            type="text"
            placeholder="Address"
          ></input>
          <Button variant="primary" type="submit" className="loginBtn">
            Sign Up
          </Button>
          <span id="linkSpan">
            Already have an account? Login <Link to="/">here</Link>{" "}
          </span>
        </div>
      </Form>
      {redirect}
    </div>
  );
}

export default SignUpBox;

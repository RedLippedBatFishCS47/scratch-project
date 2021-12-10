import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const UserLogin = (props) => {
  let navigate = useNavigate();

  function send() {
    console.log(document.getElementById("loginUsername").value);
    console.log(document.getElementById("loginPassword").value);
    fetch("/api/login", {
      method: "POST",
      body: JSON.stringify({
        username: document.getElementById("loginUsername").value,
        password: document.getElementById("loginPassword").value,
      }),
      headers: { "Content-Type": "application/json" },
    }).then((response) => {
      if (response.status === 200) {
        console.log(response);
        navigate("/chatroom");
      } else {
        console.log("login failed");
        document.getElementById("loginfailed").style.display = "block";
      }
    });
  }

// if the browser has a cookie, redirect to chatroom instead
  useEffect(() => {
    if (document.cookie) navigate("/chatroom");
  });

  const redirectToSignUp = () => {
    navigate("/signup");
  };
  // if when the page first renders, if the broswer has a cookie
  // redirect to chatroom
  // if (document.cookie !== "") {
  //   console.log('testing to see if/when this fires"');
  //   console.log(document.cookie);
  //   navigate("/chatroom");
  // }

  return (
    <div id="UserLogin" style={{ display: "block" }}>
      <h2>Login</h2>
      <input
        className="textInput"
        id="loginUsername"
        placeholder="Enter username"
      ></input>
      <br />
      <input
        className="textInput"
        id="loginPassword"
        type="password"
        placeholder="Enter password"
      ></input>
      <br />
      <div id="loginButtons">
        <button id="loginButton" className="submitButton" onClick={send}>
          Login
        </button>
        <button
          id="createAccount"
          className="submitButton"
          onClick={redirectToSignUp}
        >
          Sign up
        </button>
      </div>
      <p align="center" id="loginfailed" style={{ display: "none" }}>
        Username/password does not exist
      </p>
    </div>
  );
};

export default UserLogin;

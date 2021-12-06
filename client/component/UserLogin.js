import React, { Component, useState, setState } from "react";

const UserLogin = (props) => {
  function send() {
    console.log(document.getElementById("loginUsername").value)
    console.log(document.getElementById("loginPassword").value)
    fetch("/api/login", {
      method: "POST",
      body: JSON.stringify({
        username: document.getElementById("loginUsername").value,
        password: document.getElementById("loginPassword").value,
      }),
      headers: { "Content-Type": "application/json" },
    }).then(() => {
      console.log('login completed')
      //what happens if dupe username?
      //otherwise, if we login the user...then what?
      props.fetchMessages();
      document.getElementById("UserLogin").style.display = "none";
      document.getElementById("MessageDisplay").style.display = "block";
    });
  }

function redirectToSignUp(){
  document.getElementById("UserCreator").style.display = "block";
  document.getElementById("UserLogin").style.display = "none";
}
  return (
    <div id="UserLogin" style={{ display: "block" }}>
      <h2>Login (COOOL people ONLY!)</h2>
      <input
        className="textInput"
        id="loginUsername"
        placeholder="Enter username"
      ></input>
      <input
        className="textInput"
        id="loginPassword"
        type="password"
        placeholder="Enter password"
      ></input>
      <button className="submitButton" onClick={send}>
        Login
      </button>
      <button className="submitButton" onClick={redirectToSignUp}>
        Create an account
      </button>
    </div>
  );
};

export default UserLogin;

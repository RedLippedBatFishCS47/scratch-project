import React, { Component, useState, setState } from "react";

const UserLogin = () => {
  function send() {
    fetch("/api/register", {
      method: "POST",
      body: JSON.stringify({
        username: document.getElementById("createUsername").value,
        content: document.getElementById("createPassword").value,
      }),
      headers: { "Content-Type": "application/json" },
    }).then(() => {
      //what happens if dupe username?

      //otherwise, if we create the user...then what?
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
        id="createUsername"
        placeholder="Enter username"
      ></input>
      <input
        className="textInput"
        id="createPassword"
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

import React, { Component, useState, setState } from "react";

const UserCreator = () => {
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
      props.fetchMessages();
      document.getElementById("UserCreator").style.display = "none";
      document.getElementById("MessageDisplay").style.display = "block";
    });
  }
  function redirectLogin(){
    document.getElementById("UserCreator").style.display = "none";
    document.getElementById("UserLogin").style.display = "block";
  }
  return (
    <div id="UserCreator" style={{ display: "none" }}>

      <h2>Register ONLY if you are a COOOOL person!</h2>
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
        Register
      </button>
      <button className="submitButton" onClick={redirectLogin}>
        Log-in Instead
      </button>
    </div>
  );
};

export default UserCreator;

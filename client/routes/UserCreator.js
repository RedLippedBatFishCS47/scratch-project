import React from "react";
import { useNavigate } from "react-router";

const UserCreator = (props) => {
  let navigate = useNavigate();
  function send() {
    fetch("/api/register", {
      method: "POST",
      body: JSON.stringify({
        username: document.getElementById("createUsername").value,
        password: document.getElementById("createPassword").value,
      }),
      headers: { "Content-Type": "application/json" },
    }).then((response) => {
      console.log(response.status);
      if (response.status === 200) {
        navigate("/chatroom");
      } else {
        console.log(response);
        document.getElementById("registerfailed").style.display = "block";
      }
    });
  }
  function redirectLogin() {
    navigate("/");
  }
  return (
    <div id="UserCreator" style={{ display: "block" }}>
      <h2>Register please, chatter!</h2>
      <input
        className="textInput"
        id="createUsername"
        placeholder="Enter username"
      ></input>
      <br />
      <input
        className="textInput"
        id="createPassword"
        type="password"
        placeholder="Enter password"
      ></input>
      <br />
      <div id="loginButtons">
        <button className="submitButton" onClick={redirectLogin}>
          Log-in Instead
        </button>
        <button className="submitButton" onClick={send}>
          Register
        </button>
      </div>
      <p align="center" id="registerfailed" style={{ display: "none" }}>
        Username already exists, pick a different name!
      </p>
    </div>
  );
};

export default UserCreator;

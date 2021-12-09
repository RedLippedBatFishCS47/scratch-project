import React from "react";

const UserCreator = (props) => {
  function send() {
    console.log(document.getElementById("createUsername").value)
    console.log(document.getElementById("createPassword").value)
    fetch("/api/register", {
      method: "POST",
      body: JSON.stringify({
        username: document.getElementById("createUsername").value,
        password: document.getElementById("createPassword").value,
      }),
      headers: { "Content-Type": "application/json" },
    }).then((response) => {
      console.log(response.status)
      if(response.status===200){
        console.log(response)
        console.log('registration completed')
        //what happens if dupe username?
        //otherwise, if we create the user...then what?
        props.fetchMessages();
        document.getElementById("UserCreator").style.display = "none";
        // document.getElementById("MessageDisplay").style.display = "block";
      } else{
        console.log(response)
        document.getElementById("registerfailed").style.display = "block";
      }
    });
  }
  function redirectLogin(){
    document.getElementById("UserCreator").style.display = "none";
    document.getElementById("UserLogin").style.display = "block";
  }
  return (
    <div id="UserCreator" style={{ display: "none" }}>

      <h2>Register please, chatter!</h2>
      <input
        className="textInput"
        id="createUsername"
        placeholder="Enter username"
      ></input><br/>
      <input
        className="textInput"
        id="createPassword"
        type="password"
        placeholder="Enter password"
      ></input><br/>
      <div id="loginButtons">
        <button className="submitButton" onClick={redirectLogin}>
          Log-in Instead
        </button>
        <button className="submitButton" onClick={send}>
          Register
        </button>
      </div>
      <p align="center" id="registerfailed" style={{display: "none"}}>Username already exists, pick a different name!</p>
    </div>
  );
};

export default UserCreator;

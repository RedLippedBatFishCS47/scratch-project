import React, { Component, useState, setState } from 'react';

const MessageInput = (props) => {
  function send() {
    const userName = document.cookie.split("=")[1];
    fetch('/api/messages', {
      method: 'POST',
      body: JSON.stringify({ username: userName, content: document.getElementById('content').value}),
      headers: { 'Content-Type': 'application/json' },
    })
    .then(() => {
      props.fetchMessages();
      document.getElementById('content').value = '';
    })
  }
  return(
    <div>
              <textarea className="textInput" id="content" placeholder="Type message here"></textarea>
              <p></p>
        {/* <input className="textInput" id="username" placeholder="Enter username"></input> */}
        <button className = "submitButton" onClick={send}>Send</button>

    </div>
  )
}

export default MessageInput;

import React, { Component, useState, setState } from 'react';

const MessageInput = (props) => {
  function send() {
    fetch('/api/messages', {
      method: 'POST',
      body: JSON.stringify({ username: document.getElementById('username').value, content: document.getElementById('content').value}),
      headers: { 'Content-Type': 'application/json' },
    })
    .then(() => {
      props.fetchMessages();
      document.getElementById('content').value = '';
    })
  }
  return(
    <div>
        <input className="textInput" id="username" placeholder="Enter username"></input>
        <input className="textInput" id="content" placeholder="Type message here"></input>
        <button className = "submitButton" onClick={send}>Send</button>
    </div>
  )
}

export default MessageInput;
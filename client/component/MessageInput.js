import React, { Component, useState, setState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

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
    <div className="inputFields">
              <textarea className="textInput" id="content" placeholder="Type message here"></textarea>
        <button id="submitButton" className = "submitButton" onClick={send}>Send</button>

    </div>
  )
}

export default MessageInput;
